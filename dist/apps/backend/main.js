/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const app_controller_1 = __webpack_require__(5);
const app_service_1 = __webpack_require__(6);
const auth_module_1 = __webpack_require__(7);
const prisma_mdule_1 = __webpack_require__(30);
const company_module_1 = __webpack_require__(31);
const client_module_1 = __webpack_require__(35);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, prisma_mdule_1.PrismaModule, company_module_1.CompanyModule, client_module_1.ClientModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const app_service_1 = __webpack_require__(6);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
exports.AppController = AppController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
exports.AppController = AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
let AppService = class AppService {
    async getData() {
        const blla = {
            id: 1,
            email: 'test',
        };
        return blla;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const auth_service_1 = __webpack_require__(8);
const auth_controller_1 = __webpack_require__(22);
const users_module_1 = __webpack_require__(26);
const passport_1 = __webpack_require__(27);
const jwt_1 = __webpack_require__(21);
const jwt_strategy_1 = __webpack_require__(28);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET_KEY,
                signOptions: { expiresIn: '7D' }, //7 days
            }),
        ],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const users_service_1 = __webpack_require__(9);
const jwt_1 = __webpack_require__(21);
const bcrypt = tslib_1.__importStar(__webpack_require__(12));
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async signIn(email, pass, res) {
        const user = await this.usersService.findOne(email);
        if (!user || !(await bcrypt.compare(pass, user.password))) {
            return res
                .status(401)
                .json({ message: 'Invalid credentials', success: false });
        }
        const payload = {
            email: user.email,
            id: user.id,
            company_id: user.company_id,
        };
        const token = this.jwtService.sign(payload);
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return res.json({
            message: 'Logged in successfully',
            success: true,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                Company: {
                    name: user.Company.name,
                    id: user.Company.id,
                },
            },
        });
    }
    //TODO with cookies
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async register(createUserDto) {
        const user = await this.usersService.createUser(createUserDto);
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async me(req, res) {
        const user = await this.usersService.findOne(req.user.email);
        return res.json({
            message: 'User found',
            success: true,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                Company: {
                    name: user.Company.name,
                    id: user.Company.id,
                },
            },
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(10);
const bcrypt = tslib_1.__importStar(__webpack_require__(12));
const utils_1 = __webpack_require__(13);
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(createUserDto) {
        const { email, password, firstName, lastName, companyId } = createUserDto;
        if (!(0, utils_1.validateEmail)(email)) {
            throw new Error('Invalid email');
        }
        const hashPassword = (password) => {
            const saltRounds = 10;
            return bcrypt.hash(password, saltRounds);
        };
        const hashedPassword = await hashPassword(password);
        return this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                company_id: companyId,
            },
            select: {
                id: true,
                email: true,
            },
        });
    }
    async findOne(email) {
        return this.prisma.user.findFirst({
            where: {
                email,
            },
            include: {
                Company: true,
            },
        });
    }
    async hashPassword(password) {
        return password;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], UsersService);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const client_1 = __webpack_require__(11);
let PrismaService = class PrismaService extends client_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Injectable)()
], PrismaService);


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(14), exports);
tslib_1.__exportStar(__webpack_require__(15), exports);
tslib_1.__exportStar(__webpack_require__(16), exports);
tslib_1.__exportStar(__webpack_require__(17), exports);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.utils = utils;
function utils() {
    return 'utils';
}


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateEmail = validateEmail;
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.apiClient = void 0;
const apiClient = async (endpoint, method, body, headers) => {
    const res = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        credentials: 'include',
        body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
        return {
            error: true,
            status: res.status,
            message: res.statusText,
        };
    }
    return res.json();
};
exports.apiClient = apiClient;


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(18), exports);
tslib_1.__exportStar(__webpack_require__(19), exports);
tslib_1.__exportStar(__webpack_require__(20), exports);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const express_1 = __webpack_require__(23);
const auth_service_1 = __webpack_require__(8);
const create_user_dto_1 = __webpack_require__(24);
const auth_guard_1 = __webpack_require__(25);
const utils_1 = __webpack_require__(13);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signIn(signInDto, res) {
        return this.authService.signIn(signInDto.email, signInDto.password, res);
    }
    async register(body) {
        return this.authService.register(body);
    }
    async me(req, res) {
        return this.authService.me(req, res);
    }
};
exports.AuthController = AuthController;
tslib_1.__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('login'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "signIn", null);
tslib_1.__decorate([
    (0, common_1.Post)('register'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof create_user_dto_1.CreateUserDto !== "undefined" && create_user_dto_1.CreateUserDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('me'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof utils_1.AuthenticatedRequest !== "undefined" && utils_1.AuthenticatedRequest) === "function" ? _d : Object, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
exports.AuthController = AuthController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthGuard = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(21);
let AuthGuard = class AuthGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromCookies(request);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET_KEY,
            });
            request['user'] = payload;
        }
        catch {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
    extractTokenFromCookies(request) {
        // Ensure you have cookie-parser middleware installed and configured
        return request.cookies?.access_token;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], AuthGuard);


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const users_service_1 = __webpack_require__(9);
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [users_service_1.UsersService],
        exports: [users_service_1.UsersService],
    })
], UsersModule);


/***/ }),
/* 27 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(27);
const passport_jwt_1 = __webpack_require__(29);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => request?.cookies?.access_token,
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY,
        });
    }
    async validate(payload) {
        return { userId: payload.sub, email: payload.email };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], JwtStrategy);


/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(10);
let PrismaModule = class PrismaModule {
};
exports.PrismaModule = PrismaModule;
exports.PrismaModule = PrismaModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], PrismaModule);


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompanyModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const company_service_1 = __webpack_require__(32);
const company_controller_1 = __webpack_require__(33);
const auth_module_1 = __webpack_require__(7);
const jwt_1 = __webpack_require__(21);
let CompanyModule = class CompanyModule {
};
exports.CompanyModule = CompanyModule;
exports.CompanyModule = CompanyModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule],
        controllers: [company_controller_1.CompanyController],
        providers: [company_service_1.CompanyService, jwt_1.JwtService],
    })
], CompanyModule);


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompanyService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(10);
const auth_service_1 = __webpack_require__(8);
let CompanyService = class CompanyService {
    constructor(prisma, authUser) {
        this.prisma = prisma;
        this.authUser = authUser;
    }
    async create(createCompanyDto) {
        const company = await this.prisma.company.create({
            data: {
                name: createCompanyDto.name,
            },
        });
        const user = await this.authUser.register({
            email: createCompanyDto.email,
            password: createCompanyDto.password,
            firstName: createCompanyDto.firstName,
            lastName: createCompanyDto.lastName,
            companyId: company.id,
        });
        return { ...company, user };
    }
    async findFirstCompany(id) {
        const company = await this.prisma.company.findUnique({ where: { id } });
        if (!company) {
            throw new common_1.NotFoundException(`Company not found`);
        }
        return company;
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _b : Object])
], CompanyService);


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompanyController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const company_service_1 = __webpack_require__(32);
const create_company_dto_1 = __webpack_require__(34);
const auth_guard_1 = __webpack_require__(25);
// import { UpdateCompanyDto } from './dto/update-company.dto';
let CompanyController = class CompanyController {
    constructor(companyService) {
        this.companyService = companyService;
    }
    create(createCompanyDto) {
        return this.companyService.create(createCompanyDto);
    }
    // @Get()
    // findAll() {
    //   return this.companyService.findAll();
    // }
    findOne(input) {
        return this.companyService.findFirstCompany(input.id);
    }
};
exports.CompanyController = CompanyController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof create_company_dto_1.CreateCompanyDto !== "undefined" && create_company_dto_1.CreateCompanyDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], CompanyController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], CompanyController.prototype, "findOne", null);
exports.CompanyController = CompanyController = tslib_1.__decorate([
    (0, common_1.Controller)('company'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof company_service_1.CompanyService !== "undefined" && company_service_1.CompanyService) === "function" ? _a : Object])
], CompanyController);


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCompanyDto = void 0;
const create_user_dto_1 = __webpack_require__(24);
class CreateCompanyDto extends create_user_dto_1.CreateUserDto {
}
exports.CreateCompanyDto = CreateCompanyDto;


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClientModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const client_controller_1 = __webpack_require__(36);
const auth_module_1 = __webpack_require__(7);
const createClient_service_1 = __webpack_require__(37);
const jwt_1 = __webpack_require__(21);
const getClients_service_1 = __webpack_require__(39);
let ClientModule = class ClientModule {
};
exports.ClientModule = ClientModule;
exports.ClientModule = ClientModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule],
        controllers: [client_controller_1.ClientController],
        providers: [createClient_service_1.CreateClientService, getClients_service_1.GetClientsService, jwt_1.JwtService],
    })
], ClientModule);


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClientController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const createClient_service_1 = __webpack_require__(37);
const create_client_dto_1 = __webpack_require__(38);
const utils_1 = __webpack_require__(13);
const auth_guard_1 = __webpack_require__(25);
const getClients_service_1 = __webpack_require__(39);
let ClientController = class ClientController {
    constructor(createClientService, getClientsService) {
        this.createClientService = createClientService;
        this.getClientsService = getClientsService;
    }
    async create(req, createClientDto) {
        return this.createClientService.createClient(req, createClientDto);
    }
    async getClients(req) {
        return this.getClientsService.getClients(req);
    }
};
exports.ClientController = ClientController;
tslib_1.__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof utils_1.AuthenticatedRequest !== "undefined" && utils_1.AuthenticatedRequest) === "function" ? _c : Object, typeof (_d = typeof create_client_dto_1.CreateClientDtoInput !== "undefined" && create_client_dto_1.CreateClientDtoInput) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClientController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof utils_1.AuthenticatedRequest !== "undefined" && utils_1.AuthenticatedRequest) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClientController.prototype, "getClients", null);
exports.ClientController = ClientController = tslib_1.__decorate([
    (0, common_1.Controller)('clients'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof createClient_service_1.CreateClientService !== "undefined" && createClient_service_1.CreateClientService) === "function" ? _a : Object, typeof (_b = typeof getClients_service_1.GetClientsService !== "undefined" && getClients_service_1.GetClientsService) === "function" ? _b : Object])
], ClientController);


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateClientService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(10);
let CreateClientService = class CreateClientService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createClient(req, createClientDto) {
        const { email, firstName, lastName, address, allergies, bloodGroup, city, country, dob, gender, phone, postalCode, } = createClientDto;
        const createdClient = await this.prisma.client.create({
            data: {
                email,
                firstName,
                lastName,
                address,
                allergies,
                bloodGroup,
                city,
                country,
                dob,
                gender,
                phone,
                postalCode,
                company_id: req.user.company_id,
                created_by: req.user.id,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
            },
        });
        return createdClient;
    }
};
exports.CreateClientService = CreateClientService;
exports.CreateClientService = CreateClientService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], CreateClientService);


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetClientsService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(10);
let GetClientsService = class GetClientsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getClients(req) {
        const clients = await this.prisma.client.findMany({
            where: {
                company_id: req.user.company_id, // fetch only clients from the same company
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
            },
        });
        return clients;
    }
};
exports.GetClientsService = GetClientsService;
exports.GetClientsService = GetClientsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], GetClientsService);


/***/ }),
/* 40 */
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const core_1 = __webpack_require__(3);
const app_module_1 = __webpack_require__(4);
const cookie_parser_1 = tslib_1.__importDefault(__webpack_require__(40));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    });
    app.use((0, cookie_parser_1.default)());
    const port = process.env.BACKEND_PORT || 3001;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map