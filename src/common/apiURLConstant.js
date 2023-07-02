export const APIURLConstant = {
    // expense
    GET_EXPENSE_LIST: (userId) => `/expense/getExpenseList?userId=${userId}`,
    GET_EXPENSE_TYPES: (userId) => `/expense/getExpenseTypes?userId=${userId}`,
    INSERT_EXPENSE_RECORD: `/expense/insertExpense`,
    DELETE_EXPENSE_RECORD: (id) => `/expense/deleteExpense?id=${id}`,

    // income
    GET_INCOME_TYPES: (userId) => `/income/getIncomeTypes?userId=${userId}`,
    GET_INCOME_LIST: (userId) => `/income/getIncomeList?userId=${userId}`,
    INSERT_INCOME_RECORD: `/income/insertIncome`,
    DELETE_INCOME_RECORD: (id) => `/income/deleteIncome?id=${id}`,
}