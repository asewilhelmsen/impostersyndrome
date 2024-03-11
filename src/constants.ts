//For å koble teamkode sammen med epost og passord som blir brukt i Firebase authentiseringen
export const teamInfo: Record<string, { email: string; password: string }> = {
  [process.env.REACT_APP_T1_TEAMCODE as string]: {
    email: process.env.REACT_APP_T1_EMAIL as string,
    password: process.env.REACT_APP_T1_PASSWORD as string,
  },
  [process.env.REACT_APP_T2_TEAMCODE as string]: {
    email: process.env.REACT_APP_T2_EMAIL as string,
    password: process.env.REACT_APP_T2_PASSWORD as string,
  },
  [process.env.REACT_APP_T3_TEAMCODE as string]: {
    email: process.env.REACT_APP_T3_EMAIL as string,
    password: process.env.REACT_APP_T3_PASSWORD as string,
  },
  [process.env.REACT_APP_T4_TEAMCODE as string]: {
    email: process.env.REACT_APP_T4_EMAIL as string,
    password: process.env.REACT_APP_T4_PASSWORD as string,
  },
  [process.env.REACT_APP_T5_TEAMCODE as string]: {
    email: process.env.REACT_APP_T5_EMAIL as string,
    password: process.env.REACT_APP_T5_PASSWORD as string,
  },
  [process.env.REACT_APP_T6_TEAMCODE as string]: {
    email: process.env.REACT_APP_T6_EMAIL as string,
    password: process.env.REACT_APP_T6_PASSWORD as string,
  },
};

interface PostItCount {
  [tekst: string]: number;
}

// For å telle hvilke hva som er mest stemt på
export const countStrings = (stringList: string[]): PostItCount => {
  const postItCount: PostItCount = {};
  stringList.forEach((tekst) => {
    postItCount[tekst] = (postItCount[tekst] || 0) + 1;
  });
  return postItCount;
};

export const sortMostVoted = (postItCount: PostItCount): [string, number][] => {
  return Object.entries(postItCount).sort((a, b) => b[1] - a[1]);
};

export const hentOppdatertPostItListe = (
  sortedmostVoted: [string, number][]
) => {
  // Plukke ut de 5 mest stemte
  const topp5postIts = sortedmostVoted.slice(0, 5);

  //Finner counten til postiten med 5. mest stemmer
  const fifthPostItCount = topp5postIts[4]?.[1] || 0;

  //Finner alle postits med like mange stemmer som den 5. mest
  const postItsOfInterest = sortedmostVoted.filter(
    ([_, count]) => count === fifthPostItCount
  );

  //Legger til de siste postitsene
  const extendedTop5PostIts = [
    ...topp5postIts,
    ...postItsOfInterest.filter((postIt) => !topp5postIts.includes(postIt)),
  ];
  return extendedTop5PostIts;
};

export const shuffleArray = (array: string[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};
