import Mock from 'mockjs'
import login from '@/Mock/login.json'

Mock.mock("/mock/login",{code:200,data:login})