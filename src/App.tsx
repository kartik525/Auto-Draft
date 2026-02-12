import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, Form, Input, message } from 'antd'
import { Save } from 'lucide-react'
import { useContent } from './zustand/useContent'
import { debounce, set } from 'lodash'

function App() {
  const [count, setCount] = useState(0)
  const { content, setContent } = useContent()
  const [loading, setLoading] = useState(false)
  const createNote = (values: any) => {
    setContent(values.content)
    message.success('Draft saved successfully!')
  }
  const [form] = Form.useForm()
  useEffect(() => { form.setFieldValue('content', content) }, [content, form])

  const autoDraft = debounce((e: any) => {
    setLoading(true)
    setContent(e.target.value)
    setTimeout(() => {
      setLoading(false)
    }, 2000);
    // message.success('Draft saved successfully!')
  }, 1000)



  return (
    <>
      <div className='bg-gray-200 min-h-screen py-16'>
        <div className='p-4 bg-white max-w-2xl mx-auto rounded-lg shadow'>
          <h1 className='text-3xl font-bold mb-8'>Auto-Draft</h1>
          <Form onFinish={createNote} form={form}>
            <Form.Item label="" name="content" rules={[{ required: true, message: 'Please input your content!' }]}>
              <Input.TextArea size='large' rows={10} placeholder="Type your content here..." onChange={autoDraft} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<Save className='w-4 h-4 text-white mr-1' />}>
                Submit
              </Button>
            </Form.Item>
          </Form>
          {loading && (
            <Button type='text' loading> Saving draft...</Button>

          )}

        </div>
      </div>
    </>
  )
}

export default App
