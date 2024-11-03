export const generateColor = (currentColor, setCurrentColor) => {
    // const hue = Math.floor(Math.random() * 360); // Hue ranges from 0 to 360
    // const saturation = Math.floor(Math.random() * 100) + 50; // Saturation ranges from 50% to 100%
    // const lightness = Math.floor(Math.random() * 20) + 30; // Lightness ranges from 30% to 50%
    const colors = [
      '#e6194b', // red
      '#ffffff', // white
      '#a9a9a9', // grey
      '#3cb44b', // green
      '#ffe119', // yellow
      '#f58231', // orange
      '#dcbeff', // lavender
      '#9a6324', // brown
      '#fabebe', // pink
      '#7f00ff', // violet
      '#f032e6', // magenta
      '#42d4f4', // cyan
      '#800000', // maroon
      '#469990', // teal
      '#bfef45', // lime
      '#808000', // olive
      '#ffd8b1', // apricot
      '#aaffc3', // mint
      '#c8ad7f', // beige
      '#4363d8', // blue
      '#4b0082', // indigo
    ];
  
    let temp = currentColor;
  
    setCurrentColor(temp + 1);
    
    if (currentColor == 19) {
        temp = 0;
        setCurrentColor(0);
      }
  
    return colors[temp];
  };