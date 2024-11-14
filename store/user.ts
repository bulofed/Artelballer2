import { defineStore } from 'pinia'

interface UserState {
  roles: string[];
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    roles: [],
  }),
  actions: {
    addRole(role: string): void {
      this.roles.push(role);
    },
    hasRole(role: string): boolean {
      return this.roles.includes(role);
    }
  }
})