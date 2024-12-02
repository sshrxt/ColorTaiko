export const checkOrientation = (newPair, groupMapRef, topOrientation, botOrientation) => {
    if (newPair.length !== 2) return;

    const [firstConnection, secondConnection] = newPair;
    const [top1, bottom1] = firstConnection.nodes;
    const [top2, bottom2] = secondConnection.nodes;
  
    const topCombination = [top1, top2].sort().join(',');
    const bottomCombination = [bottom1, bottom2].sort().join(',');

    /*case 1
    */
    if (!topOrientation.current.has(topCombination) && !botOrientation.current.has(bottomCombination)) {
        botOrientation.current.set(bottomCombination, "right");
        topOrientation.current.set(topCombination, "right");

        if(top1 > top2) {
            topOrientation.current.set(topCombination, "left");
            return 0;
        }
        if(bottom1 > bottom2) {
            botOrientation.current.set(bottomCombination, "left");
            return 0;
        }
        return 0;
    }

    /*case 2
    */
    if(!botOrientation.current.get(bottomCombination) && topOrientation.current.get(topCombination)) {
        if(((top1 > top2) && (bottom1 > bottom2))
        || ((top1 < top2) && (bottom1 < bottom2))) {
            botOrientation.current.set(bottomCombination, topOrientation.current.get(topCombination));
        } else if(
        (   (top1 > top2) && (bottom1 < bottom2))
        || ((top1 < top2) && (bottom1 > bottom2))
        ) {
            botOrientation.current.set(bottomCombination, 
            topOrientation.current.get(topCombination) === "right" ? "left" : "right");
        }
        return 0;
    } 
    /*case 3
    */
   else if (botOrientation.current.get(bottomCombination) && !topOrientation.current.get(topCombination)) {
        if(((top1 > top2) && (bottom1 > bottom2))
        || ((top1 < top2) && (bottom1 < bottom2))) {
            topOrientation.current.set(topCombination, botOrientation.current.get(bottomCombination));
        } else if(
        (   (top1 > top2) && (bottom1 < bottom2))
        || ((top1 < top2) && (bottom1 > bottom2))
        ) {
            topOrientation.current.set(topCombination, 
            botOrientation.current.get(bottomCombination) === "right" ? "left" : "right");
        }
        return 0;
    }

    /*case 4
    */
    if(topOrientation.current.get(topCombination) && botOrientation.current.get(bottomCombination)) {
        const topGroup = groupMapRef.current.get(topCombination);
        const bottomGroup = groupMapRef.current.get(bottomCombination);
    
        if (!topGroup || !bottomGroup) {
            console.error("One of the groups is missing in groupMapRef");
            return 0;
        }

        if (groupMapRef.current.get(topCombination).color !== groupMapRef.current.get(bottomCombination).color) {
            if((((bottom1 < bottom2) 
                && (top1 < top2)
                && (botOrientation.current.get(bottomCombination) === topOrientation.current.get(topCombination))))
            || 
                (((bottom1 > bottom2) 
                && (top1 > top2)
                && (botOrientation.current.get(bottomCombination) === topOrientation.current.get(topCombination))))){
                    return 0;
            } else if (((bottom1 < bottom2) 
                && (top1 < top2)
                && (botOrientation.current.get(bottomCombination) !== topOrientation.current.get(topCombination)))
            ||  
                ((bottom1 > bottom2) 
                && (top1 > top2)
                && (botOrientation.current.get(bottomCombination) !== topOrientation.current.get(topCombination)))) 
            {
                    //flip all edges with the same color as top
                    return 1;
            } else if(((bottom1 < bottom2) 
                && (top1 > top2)
                && (botOrientation.current.get(bottomCombination) === topOrientation.current.get(topCombination)))
            ||
                ((bottom1 > bottom2) 
                && (top1 < top2)
                && (botOrientation.current.get(bottomCombination) === topOrientation.current.get(topCombination)))) 
                {
                    //flip all edges with the same color as top
                    return 1;
            } else if (((bottom1 < bottom2) 
                && (top1 > top2)
                && (botOrientation.current.get(bottomCombination) !== topOrientation.current.get(topCombination)))
            ||
                ((bottom1 > bottom2) 
                && (top1 < top2)
                && (botOrientation.current.get(bottomCombination) !== topOrientation.current.get(topCombination)))) 
                {
                    return 0;
                }

        } else             
        
            if((((bottom1 < bottom2) 
                && (top1 < top2)
                && (botOrientation.current.get(bottomCombination) === topOrientation.current.get(topCombination))))
            || 
                (((bottom1 > bottom2) 
                && (top1 > top2)
                && (botOrientation.current.get(bottomCombination) === topOrientation.current.get(topCombination))))){
                    return 0;
            } else if (((bottom1 < bottom2) 
                && (top1 < top2)
                && (botOrientation.current.get(bottomCombination) !== topOrientation.current.get(topCombination)))
            ||  
                ((bottom1 > bottom2) 
                && (top1 > top2)
                && (botOrientation.current.get(bottomCombination) !== topOrientation.current.get(topCombination)))) 
            {
                    //flip all edges with the same color as top
                    return 2;
            } else if(((bottom1 < bottom2) 
                && (top1 > top2)
                && (botOrientation.current.get(bottomCombination) === topOrientation.current.get(topCombination)))
            ||
                ((bottom1 > bottom2) 
                && (top1 < top2)
                && (botOrientation.current.get(bottomCombination) === topOrientation.current.get(topCombination)))) 
                {
                    //flip all edges with the same color as top
                    return 2;
            } else if (((bottom1 < bottom2) 
                && (top1 > top2)
                && (botOrientation.current.get(bottomCombination) !== topOrientation.current.get(topCombination)))
            ||
                ((bottom1 > bottom2) 
                && (top1 < top2)
                && (botOrientation.current.get(bottomCombination) !== topOrientation.current.get(topCombination)))) 
                {
                    return 0;
                }
}

    return 0;
};

