
export const black = "#011627"
export const white = "#fdfffc"
export const green = "#2ec4b6"
export const red = "#e71d36"
export const orange = "#ff9f1c"


export const createColorClasses = () => `
  .black {
    color: ${black};
  }

  .white {
    color: ${white};
  }
  
  .green {
    color: ${green};
  }

  .red {
    color: ${red};
  }

  .orange {
    color: ${orange};
  }  

  .bg-black {
    background-color: ${black};
  }

  .bg-white {
    background-color: ${white};
  }

  .bg-green {
    background-color: ${green};
  }

  .bg-red {
    background-color: ${red};
  }

  .bg-orange {
    background-color: ${orange};
  }

  .border-black {
    border-color: ${black};
  }

  .border-white {
    border-color: ${white};
  }

  .border-green {
    border-color: ${green};
  }

  .border-red {
    border-color: ${red};
  }

  .border-orange {
    border-color: ${orange};
  }
`