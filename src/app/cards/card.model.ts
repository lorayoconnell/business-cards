export class Card {
    displayName: string;
    id: string;
    firstName: string;
    lastName: string;
    organizationName: string;
    phone: string;
    fax: string;
    email: string;
    additionalInfo: string;
    cardImage: string;
    userId: string;

    toString(): string {

        return ("id: " + this.id + " firstName: " + this.firstName + " lastName: " + this.lastName + " orgName: " + this.organizationName 
            + " phone: " + this.phone + " fax: " + this.fax + " email: " + this.email + " additionalInfo: " + this.additionalInfo);

    }
}