export const validateBeforeAccountSave = (selectedAccount) => {
    if (!selectedAccount) {
        return false
    }
    if (!selectedAccount.username) {
        return false
    }
    if (!selectedAccount.role) {
        return false
    }
    return true
}

export const validateBeforeEmployeeSave = (selectedEmployee) => {
    if (!selectedEmployee) {
        return false
    }
    if (!selectedEmployee.nameSurname) {
        return false
    }
    if (!selectedEmployee.title) {
        return false
    }
    if (!selectedEmployee.description) {
        return false
    }
    return true
}

export const validateBeforePostSave = (selectedPost) => {
    if (!selectedPost) {
        return false
    }
    if (!selectedPost.title) {
        return false
    }
    if (!selectedPost.content) {
        return false
    }
    if (!selectedPost.author) {
        return false
    }
    return true
}