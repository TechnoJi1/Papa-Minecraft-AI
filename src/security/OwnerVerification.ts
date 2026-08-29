export class OwnerVerification { constructor(private readonly owner: string) {} verify(username: string): boolean { return this.owner.toLowerCase() === username.toLowerCase(); } }
