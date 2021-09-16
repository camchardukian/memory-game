import { v4 as uuidv4 } from 'uuid'

const Helpers = {
   generateCreatedCard: (content) => {
      if (content && content.trim()) {
         const keyForMatching = uuidv4()
         return {
            type: 'text',
            content,
            keyForMatching,
            isFlippedToBack: false,
         }
      }
   },
}
export default Helpers
