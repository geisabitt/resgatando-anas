import AuthService from "@/auth/service/authService";
import { NextRequest, NextResponse } from "next/server";

// /**
//  * @swagger
//  * /user/logout:
//  *  get:
//  *    sumary: Deslogar
//  *    description: Essa rota é responsável por deslogar o usuario
//  *    tags: ['Usuario']
//  *    responses:
//  *      200:
//  *        description: Usuario deslogado
//  *      404:
//  *        description: Usuario Não encontrado
// */


export function GET(req: NextRequest){
    AuthService.destroySession();
    return NextResponse.redirect(new URL('/', req.url))
}