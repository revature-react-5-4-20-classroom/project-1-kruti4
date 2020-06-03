export default class Role {
    roleId: number; // primary key
    role: string; // not null, unique

    constructor(roleId: number, roled: string) {
        this.roleId = roleId;
        this.role = roled;
    }
}