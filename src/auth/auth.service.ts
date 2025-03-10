import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";
import { User } from "src/user/entities/user.entity";
import { UserPayload } from "./models/UserPayload";
import { JwtService } from "@nestjs/jwt";
import { UserToken } from "./models/UserToken";
import { UnauthorizedError } from "./errors/unauthorized.error";


@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { } // acessar servico pelo construtor injecao de dependencia


    login(user: User): UserToken {

        const paylod: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name,

        }
        const jwtToken = this.jwtService.sign(paylod);

        return {
            access_token: jwtToken,
            name: user.name,
            email: user.email
        }

    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findOneByEmail(email);

        if (user) {


            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                return {
                    ...user,
                    password: undefined,
                };
            }
        }


        throw new UnauthorizedError(
            'Email ou senha Incorretos.',
        );
    }
}
