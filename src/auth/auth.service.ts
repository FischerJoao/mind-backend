import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { } // acessar servico pelo construtor injecao de dependencia

    async validateUser(email: string, password: string) {
        const user = await this.userService.findOneByEmail(email);

        if (user) {
            //comparar senha

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                return {
                    ...user,
                    password: undefined,
                };
            }
        }

        //nao encontrou nada
        throw new Error("Incorrect email or password");
    }
}
