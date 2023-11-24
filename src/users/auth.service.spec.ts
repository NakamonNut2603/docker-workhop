import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./user.entity"
import { Controller, NotFoundException } from "@nestjs/common";
import { BadRequestException } from '@nestjs/common';

describe("AuthService", () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;

    beforeEach( async () => {
        fakeUsersService = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) => 
                Promise.resolve({id: 1, email, password} as User)
        }
        
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService
                }
            ]
        }).compile();

        service = module.get(AuthService);
    });

    it("should be defined", () => {
        expect(Controller).toBeDefined();
    });

    it("create a new user with a salted and hashed password", async () => {
        const user = await service.signup("asdf@asdf.com", "asdf");

        expect(user.password).not.toEqual("asdf");
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it("throw an error when user sign up with email that is in used", async () => {
        fakeUsersService.find = () => Promise.resolve([{id: 1, email: "asdf@asdf.com", password: "1"} as User])
        await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrowError(BadRequestException);
    });

    it("throw if(signin is called with an unused email", async () => {
        await expect(service.signin("abc@abd.com", "abc")).rejects.toThrow(NotFoundException);
    })

    it("throw if an invalid password", async () => {
        fakeUsersService.find = () => Promise.resolve([{email: "asdf@asdf.com", password: "1234"} as User])
        await expect(service.signin("asdf@asdf.com", "sadf")).rejects.toThrow(BadRequestException);
    })

    it("return a user if correct password is provided", async () => {
        fakeUsersService.find = () => Promise.resolve([{email: "asdf@asdf.com", password: "3d53cec98f24a7ea.481722a19655cb73c978921302648aa855d0bf9791379786fae4866173378272"} as User])
        const user = await service.signin("asdf@asdf.com", "mypassword");
        expect(user).toBeDefined();
    })
})
