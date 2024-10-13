import Class, { IClass} from '../models/Class';

export const GetClassByNameDB = async (name: string) : Promise<IClass  | null>=> {
    return Class.findOne({ name });
}