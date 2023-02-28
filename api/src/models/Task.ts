export default class Task {
    name: string;
    done: boolean;
    categoryId: string;

    constructor(name: string, done: boolean, categoryId: string) {
        this.name = name;
        this.done = done;
        this.categoryId = categoryId;
    }
}
