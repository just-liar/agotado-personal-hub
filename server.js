import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Client } from '@notionhq/client';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const NOTION_KEY = process.env.NOTION_KEY;
const NOTION_DB_ID = process.env.NOTION_DB_ID;

// Initialize Notion Client
const notion = new Client({ auth: NOTION_KEY });

// Mock /backend-api/study-plan for the frontend (since we are creating the backend now)
app.get('/backend-api/study-plan', (req, res) => {
  res.json([
    { id: 1, subject: "数据结构", topic: "KMP算法", status: 2, priority: 3 },
    { id: 2, subject: "计算机网络", topic: "TCP拥塞控制", status: 1, priority: 3 },
    { id: 3, subject: "操作系统", topic: "虚拟内存", status: 1, priority: 2 },
    { id: 4, subject: "计算机组成原理", topic: "流水线技术", status: 0, priority: 2 },
    { id: 5, subject: "数据结构", topic: "红黑树", status: 0, priority: 1 },
    { id: 6, subject: "计算机网络", topic: "HTTP/3", status: 2, priority: 1 }
  ]);
});

// Sync mistake to Notion
app.post('/backend-api/sync-mistake', async (req, res) => {
  const { subject, question, answer, analysis } = req.body;

  if (!NOTION_KEY || !NOTION_DB_ID) {
    console.error('SERVER ERROR: Missing Notion credentials');
    console.error('NOTION_KEY exists:', !!NOTION_KEY);
    console.error('NOTION_DB_ID exists:', !!NOTION_DB_ID);
    return res.status(500).json({ error: 'Server configuration error: Missing Notion credentials' });
  }

  try {
    const response = await notion.pages.create({
      parent: { database_id: NOTION_DB_ID },
      properties: {
        "题目": {
          title: [
            {
              text: {
                content: question || "无题",
              },
            },
          ],
        },
        "科目": {
          select: {
            name: subject || "综合",
          },
        },
        "正确答案": {
          rich_text: [
            {
              text: {
                content: answer || "无",
              },
            },
          ],
        },
        "解析": {
          rich_text: [
            {
              text: {
                content: analysis || "无",
              },
            },
          ],
        },
      },
    });
    console.log("Success! Entry added.");
    res.status(200).json({ success: true, id: response.id });
  } catch (error) {
    console.error('NOTION API ERROR:', JSON.stringify(error, null, 2));
    res.status(500).json({ 
      error: 'Failed to sync to Notion', 
      details: error.message,
      code: error.code 
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
