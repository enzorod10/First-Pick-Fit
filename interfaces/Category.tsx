import Exercise from './Exercise'
import Set from './Set'

export default interface Category{
    name: string,
    exercises: Exercise[],
    weight?: number,
    sets?: Set[]
    complete?: boolean
}