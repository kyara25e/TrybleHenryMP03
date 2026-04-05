import { AppDataSource } from "../config/data-source";
import { UserRegisterDTO, UserLoginDTO, UserRegisterResponse } from "../DTO/User.DTO";
import { Credential } from "../entities/Credentials.entity";
import { User } from "../entities/User.entity";
import { UserModel } from "../repositories/User.repositories";
import { createCredentialService , checkCredentials} from "./Credential.service";


export const getUserService = async (): Promise<User[]> => {
    return await UserModel.find()
}

export const getUserByIdService = async (id: number): Promise<User> => {
    const userFound: User | null = await UserModel.findOne({
        where: {
            id
        },
        relations:["appointments"]
    })
    if(!userFound) throw new Error(`El usuario con id ${id} no fue encontrado`)
    return userFound
}


export const registerUserService = async (user: UserRegisterDTO): Promise<UserRegisterResponse> => {

    const transactionResult = await AppDataSource.transaction( async (entityManager) => {
        const credentialCreated: Credential = await createCredentialService(entityManager, user.username, user.password)
            const newUser: User = entityManager.create(User, {
                birthdate: new Date(user.birthdate),
                email: user.email,
                name: user.name,
                nDni: user.nDni,
                credentials: credentialCreated
    })
    await entityManager.save(newUser)
    return newUser
    })
    return transactionResult
}

export const loginUserService = async (user: UserLoginDTO) => {
    const credentialId: number = await checkCredentials(user.username, user.password)
    const userFound: User | null = await UserModel.findOne({
        where: {
            credentials: {
                id: credentialId
            }
        }
    })
    return {
        id: userFound?.id,
        name: userFound?.name,
        email: userFound?.email,
        birthdate: userFound?.birthdate,
        nDni: userFound?.nDni
    }
}