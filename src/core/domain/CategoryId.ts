import { v4 as uuidv4 } from 'uuid';

export class CategoryId {
    private constructor(private id?: string) {
        this.id = id ? id : uuidv4();
    }

    public static create(id?: string): CategoryId {
        return new CategoryId(id);
    }
    toString() {
        return String(this.id);
    }
}
