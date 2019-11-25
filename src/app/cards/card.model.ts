export class Card {
    id: string;
    firstName: string;
    lastName: string;
    title: string;
    organizationName: string;
    phone: string;
    fax: string;
    email: string;
    website: string;
    additionalInfo: string;
    cardImage: string;
    userId: string;

    toString(): string {
        return ("id: " + this.id + " firstName: " + this.firstName + " lastName: " + this.lastName + " title: " + this.title + " orgName: " + this.organizationName 
            + " phone: " + this.phone + " fax: " + this.fax + " email: " + this.email + " website: " + this.website + " additionalInfo: " + this.additionalInfo + " cardImage: " + this.cardImage);
    }

}