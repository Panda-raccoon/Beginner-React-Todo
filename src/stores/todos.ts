import { create } from 'zustand'
import { combine } from 'zustand/middleware'


export type Todos = Todo[]
export interface Todo {
  id: string
  order: number
  title: string
  done: boolean
  createdAt: string
  updatedAt: string
}

export const useTodosStore = create (
  combine({
    todos: [] as Todos,
    message: '',
    loading: true,
  }, function (set) {
    return {
      getTodos: async function () {
        try {
          const res = await fetch (
            'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',// method 가 표시되어있지 않으면 기본적으로 'GET'이 적용되어있음
            {
              headers: {
              'content-type': 'application/json',
              //개체의 속성이름은 특수기호를 쓸수없음
                apikey: 'KDT9_AHMq2s7n',
                username: 'FE1_ LeeYeonJi'
              }
            }
          )
          const data = await res.json()
          console.log('응답결과:', data)
          set ({
            todos: data
          })
        } catch (error) { 
          if (error instanceof Error) {
            // console.error('에러임..', error.message)
            const message = '서버가 폭발했어요!'
            console.error('에러임..', message)
            set ({
              message
            })
          } 
        } finally {
          set ({
            loading: false
          })
        }
      }
    }
  })
)

