export const state = () => ({
    jwt: {}
})

export const mutations = {
    set(state, data) {
        state.jwt = data;
    }
}