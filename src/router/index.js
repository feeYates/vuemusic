import Vue from 'vue'
import Router from 'vue-router'


import Home from '@/views/home/Home'
import Main from '@/views/home/subComponents/Main'
import Singer from '@/views/home/subComponents/Singer'
import List from '@/views/home/subComponents/List'
import Search from '@/views/home/subComponents/Search'
import Profile from '@/views/home/subComponents/Profile'
import MoreList from '@/views/home/subComponents/MoreList'
import MusicPlayer from '@/views/home/subComponents/MusicPlayer'

import NewList from '@/views/home/subComponents/musicList/NewList'
import HotList from '@/views/home/subComponents/musicList/HotList'
import KingList from '@/views/home/subComponents/musicList/RockList'

import MusicalWork from '@/views/home/subComponents/musicalWork/MusicalWork'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/player',
      name: 'MusicPlayer',
      component: MusicPlayer
    },
    {
      path: '/home/musicalwork',
      name: 'MusicalWork',
      component: MusicalWork
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/home',
          redirect: '/home/main'
        },
        {
          path: '/home/main',
          component: Main,
          children: [
                {
                  path: '/home/main',
                  redirect: '/home/main/hot_list'
                },   
                {
                  path: '/home/main/hot_list',
                  component: HotList
                },
                {
                  path: '/home/main/new_list',
                  component: NewList
                },
                {
                  path: '/home/main/rock_list',
                  component: KingList
                }
          ]
        },
        {
          path: '/home/singer',
          component: Singer
        },
        {
          path: '/home/list',
          component: List
        },
        {
          path: '/home/search',
          component: Search
        },
        {
          path: '/home/profile',
          component: Profile
        },
        {
          path: '/home/more',
          name: 'MoreList',
          component: MoreList
        }
      ]
    },
  ],
  mode: 'history'
})
