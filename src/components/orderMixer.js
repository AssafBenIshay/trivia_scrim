export default function orderMixer(order) {
    
        const newOrder = []
        for (let i = 0; i < 4; i++) {

            var num = Math.floor(Math.random() * 4)


            if (i === 0) {
                newOrder.push(num)
            } else {
                if (newOrder.includes(num)) {
                    i--
                } else {
                    newOrder.push(num)
                }
            }
        }
        const newArr = [...order]
        newArr.push(newOrder)

        return newArr

};  
