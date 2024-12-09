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

        // Remove this block that was returning -1
        // if (topGroup === bottomGroup) {
        //     return -1;
        // }

        const topDir = topOrientation.current.get(topCombination);
        console.log(topDir);
        const botDir = botOrientation.current.get(bottomCombination);
        console.log(botDir);
        const isCrossed = (bottom1 < bottom2 && top1 > top2) || (bottom1 > bottom2 && top1 < top2);

        if (isCrossed) {
            // 需要翻转 topGroup 中所有 combination 的方向
            for (const combo of topGroup.combinations) {
                console.log(combo);
                if (topOrientation.current.has(combo)) {
                    const dir = topOrientation.current.get(combo);
                    topOrientation.current.set(combo, dir === "right" ? "left" : "right");
                }
                if (botOrientation.current.has(combo)) {
                    const dir = botOrientation.current.get(combo);
                    botOrientation.current.set(combo, dir === "right" ? "left" : "right");
                }
            }
            return 0;
        }
    
        return 0;
    }

    // Add a default return at the end
    return 0;
};

