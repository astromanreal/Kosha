'use client';

const ACTIVITY_STORAGE_KEY = 'koshaExplorerActivity';

interface ActivityData {
  calculatorUsage: { [slug: string]: number };
  prakritiQuizCompletions: number;
  wellnessPlanGenerations: number;
  koshaAdvisorUsages: number;
  lastActivityDate: string;
  quizCompletions: { [quizName: string]: { attempts: number; bestScore?: number } };
}

const getDefaultActivityData = (): ActivityData => ({
  calculatorUsage: {},
  prakritiQuizCompletions: 0,
  wellnessPlanGenerations: 0,
  koshaAdvisorUsages: 0,
  lastActivityDate: new Date().toISOString(),
  quizCompletions: {},
});

export function getActivityData(): ActivityData {
  if (typeof window === 'undefined') return getDefaultActivityData();
  try {
    const storedData = localStorage.getItem(ACTIVITY_STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData) as Partial<ActivityData>;
      return {
        calculatorUsage: typeof parsedData.calculatorUsage === 'object' && parsedData.calculatorUsage !== null ? parsedData.calculatorUsage : {},
        prakritiQuizCompletions: typeof parsedData.prakritiQuizCompletions === 'number' ? parsedData.prakritiQuizCompletions : 0,
        wellnessPlanGenerations: typeof parsedData.wellnessPlanGenerations === 'number' ? parsedData.wellnessPlanGenerations : 0,
        koshaAdvisorUsages: typeof parsedData.koshaAdvisorUsages === 'number' ? parsedData.koshaAdvisorUsages : 0,
        lastActivityDate: typeof parsedData.lastActivityDate === 'string' ? parsedData.lastActivityDate : new Date().toISOString(),
        quizCompletions: typeof parsedData.quizCompletions === 'object' && parsedData.quizCompletions !== null ? parsedData.quizCompletions : {},
      };
    }
  } catch (error) {
    console.error("Error reading activity data from localStorage:", error);
  }
  return getDefaultActivityData();
}

function updateActivityData(updater: (data: ActivityData) => ActivityData) {
  if (typeof window === 'undefined') return;
  const currentData = getActivityData();
  const updatedData = updater(currentData);
  updatedData.lastActivityDate = new Date().toISOString();
  localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(updatedData));
}

export function trackCalculatorUsage(slug: string) {
  updateActivityData(data => {
    const newData = { ...data };
    newData.calculatorUsage = { ...newData.calculatorUsage }; 
    newData.calculatorUsage[slug] = (newData.calculatorUsage[slug] || 0) + 1;
    return newData;
  });
}

export function trackPrakritiQuizCompletion() {
  updateActivityData(data => ({
    ...data,
    prakritiQuizCompletions: (data.prakritiQuizCompletions || 0) + 1,
  }));
}

export function trackWellnessPlanGeneration() {
  updateActivityData(data => ({
    ...data,
    wellnessPlanGenerations: (data.wellnessPlanGenerations || 0) + 1,
  }));
}

export function trackKoshaAdvisorUsage() {
  updateActivityData(data => ({
    ...data,
    koshaAdvisorUsages: (data.koshaAdvisorUsages || 0) + 1,
  }));
}

export function trackQuizCompletion(quizName: string, score: number, totalPossibleScore: number) {
  updateActivityData(data => {
    const quizStats = data.quizCompletions[quizName] || { attempts: 0 };
    quizStats.attempts += 1;
    if (quizStats.bestScore === undefined || score > quizStats.bestScore) {
      quizStats.bestScore = score;
    }
    return {
      ...data,
      quizCompletions: {
        ...data.quizCompletions,
        [quizName]: quizStats,
      },
    };
  });
}


export function getProgressStats() {
    const data = getActivityData();
    const totalCalculatorsUsed = Object.values(data.calculatorUsage).reduce((sum, count) => sum + count, 0);
    const uniqueCalculatorsUsedCount = Object.keys(data.calculatorUsage).length;
    const totalQuizAttempts = Object.values(data.quizCompletions).reduce((sum, qc) => sum + qc.attempts, 0);

    return {
        totalCalculatorsUsed,
        uniqueCalculatorsUsedCount,
        prakritiQuizCompletions: data.prakritiQuizCompletions,
        wellnessPlanGenerations: data.wellnessPlanGenerations,
        koshaAdvisorUsages: data.koshaAdvisorUsages,
        lastActivityDate: data.lastActivityDate,
        totalQuizAttempts,
        quizCompletionsData: data.quizCompletions, // for more detailed display if needed
    };
}
