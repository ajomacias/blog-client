import {  ReactNode } from 'react'
import { Params } from 'react-router-dom'

export type Props = {
    children? : ReactNode
}

export type propsLoader = {
    params? : Params<string>
    request? : Request

}