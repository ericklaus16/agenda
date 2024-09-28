import { useEffect, useState } from 'react'
import './App.css'
import { Inset, Strong, Text, Box, Card } from '@radix-ui/themes'
import { TaskType } from './types/TaskType'
import axios from 'axios'
import { Book } from 'lucide-react'

function App() {
  const [ tasks, setTasks ] = useState<TaskType>([]);

  useEffect(() => {
    axios.get("http://agendaapi123456.mypressonline.com/getTasks.php").then((res) => {
      console.log(res.data);
      setTasks(res.data);
    })
    .catch(error => {
      console.error('Erro ao fazer a requisição:', error);  // Tratamento de erro
    });
  }, [])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex items-center gap-4">
          {tasks.map((task) => (
            <Box key={task.id} maxWidth="240px" className="h-72 w-60">
              <Card size="2" className="h-full">
                <Inset clip="padding-box" side="top" pb="current">     
                  <Book 
                  style={{
                    display: 'block',
                    objectFit: 'cover',
                    width: '100%',
                    height: 140,
                    backgroundColor: 'var(--gray-5)',
                  }}
                  />
                </Inset>
                <Text as="p" size="3">
                  <Strong>{task.title}</Strong>
                  <p>{task.description}</p>
                </Text>
              </Card>
            </Box>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
