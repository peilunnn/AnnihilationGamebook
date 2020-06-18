import Page from "./Page"
import Choice from "./Choice"
import Text from "./Text"

class Parser {
    constructor() { }
    parse_choice(choice) {
        if (choice) {
            const number = parseInt(choice[0]);
            const text = choice.split(">")[0];
            const splitChoice = choice.split(">")
            const link = parseInt(splitChoice[splitChoice.length - 1]);
            return new Choice(number, text, link);
        }
    }


    parse_page(page) {
        // SPLIT BY NEWLINE CHARACTER AND GET BACK A LIST OF LINES WITHOUT EMPTY ELEMENTS
        let lines = page.split("\n");
        lines = lines.filter((line) => line.trim() != "");

        // PAGE NO. IS ALWAYS THE FIRST ELEMENT IN THE LIST
        const number = lines[0].split(" ")[1];

        // HEADING IS ALWAYS THE SECOND ELEMENT IN THE LIST
        const heading = lines[1];

        // USE INDEX OF "CHOICES:" TO GET STORY CONTENT AND JOIN THE ELEMENTS IN THE LIST
        const choice_index = lines.indexOf("Choices:");
        let content = lines.slice(2, choice_index)
        content = content.join("\n\n");

        // USE INDEX OF "CHOICES:" TO GET CHOICES BY SELECTING EVERYTHING AFTER THAT
        let choices = lines.slice(choice_index + 1);

        // FOR EACH INDIVIDUAL CHOICE IN CHOICES, APPLY THE PARSE_CHOICE FUNCTION AND GET A LIST OF CHOICE OBJECTS
        choices = choices.map((c) => this.parse_choice(c));
        return new Page(number, heading, content, choices);
    }


    parse_pages(pages) {
        const re = /[^\x00-\x7F]/g;
        pages = pages.replace(re, "");
        pages = pages.split("!!!");

        // FOR EACH INDIVIDUAL PAGE IN PAGES, APPLY THE PARSE_PAGE FUNCTION AND GET A LIST OF PAGE OBJECTS
        pages = pages.map((p) => this.parse_page(p));
        return pages;
    }


    main() {
        let pages = new Text().text;

        // RETURN A LIST OF PAGE OBJECTS
        pages = this.parse_pages(pages);

        const book = {};

        for (let p of pages) {
            book[p.number] = p
        }
        
        return book
    }
}

export default Parser