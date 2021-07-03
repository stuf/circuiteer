declare namespace Hooks {
  export namespace Design {
    export interface UseDesignNameHookFn {
      (): [string, (name: string) => void];
    }
  }
}
