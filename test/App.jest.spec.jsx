import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../src/App'
import blogService from '../src/services/blogs'
import loginService from '../src/services/login'

jest.mock('../src/services/blogs')
jest.mock('../src/services/login')

describe('<App />', () => {
  beforeEach(() => {
    window.localStorage.clear()
    jest.clearAllMocks()
  })

  test('shows login form when no user is logged in', () => {
    render(<App />)

    expect(screen.getByText('Blogs')).toBeInTheDocument()
    expect(screen.getByText('login')).toBeInTheDocument()
  })

  test('fetches blogs when user exists in localStorage', async () => {
    const user = {
      username: 'testuser',
      name: 'Test User',
      token: '12345'
    }

    window.localStorage.setItem(
      'loggedInUser',
      JSON.stringify(user)
    )

    blogService.getAll.mockResolvedValueOnce([
      {
        id: '1',
        title: 'First Blog',
        author: 'John Doe',
        likes: 5
      }
    ])

    render(<App />)

    await waitFor(() => {
      expect(blogService.getAll).toHaveBeenCalledTimes(1)
    })
  })

  test('shows error when fetching blogs fails', async () => {
    const user = {
      username: 'testuser',
      name: 'Test User',
      token: '12345'
    }

    window.localStorage.setItem(
      'loggedInUser',
      JSON.stringify(user)
    )

    blogService.getAll.mockRejectedValueOnce(
      new Error('Network Error')
    )

    render(<App />)

    await waitFor(() => {
      expect(
        screen.getByText('Failed to fetch blogs')
      ).toBeInTheDocument()
    })
  })

  test('renders logged in user', async () => {
    const user = {
      username: 'testuser',
      name: 'Test User',
      token: '12345'
    }

    window.localStorage.setItem(
      'loggedInUser',
      JSON.stringify(user)
    )

    blogService.getAll.mockResolvedValueOnce([])

    render(<App />)

    await waitFor(() => {
      expect(
        screen.getByText(/Test User logged in/i)
      ).toBeInTheDocument()
    })
  })
})
