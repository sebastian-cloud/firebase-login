
export interface LoginBody {
    email:          string,
    password:       string
}

export interface RegisterBody {
    email:          string,
    password:       string,
    displayName:    string
}

export interface Task {
    id:             string,
    name:           string,
    done:           boolean,
    created_at:     number
}

export interface NewTaskBody {
    task: string
}