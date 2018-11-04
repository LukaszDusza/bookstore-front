export class User {
    firstName: string;
    lastName: string;
  
    constructor(user?: any) {
      this.firstName = user && user.firstName || null;
      this.lastName = user && user.lastName || null;
    }
  }