/** Minecraft usernames are case-sensitive here to avoid authorizing a lookalike account. */
export class PermissionManager {
  constructor(private readonly owner: string) {}
  canControl(username: string): boolean { return username === this.owner; }
}
