import { tags } from "../model.js"
export default {
    getTagById: (id) => {
        return tags.find(tag => tag.id == id)
    },
    getTagsList: () => {
        const output = []
        tags.forEach(tag => output.push(tag.name))
        return output
    },
    getAllTags: () => {
        return tags
    },
    addNewTag: (tag) => {
        const ids = tags.map(tag => tag.id)
        const newtag = {
            id: Math.max(...ids) + 1,
            name: tag,
            popularity: Math.round(Math.random() * 1000)
        }
        tags.push(newtag)
        return newtag
    }

}