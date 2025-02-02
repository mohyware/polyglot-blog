"use client";
import React from 'react'
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'
import styled from "@emotion/styled";

const KRMD = styled(ReactMarkdown)`
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    font-weight: bold;
    color: #333;
  }

  h2 {
    font-size: 2.4rem;
    margin-bottom: 1rem;
    font-weight: bold;
    color: #444;
  }

  h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
    font-weight: bold;
    color: #555;
  }

  h4 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    font-weight: bold;
    color: #666;
  }

  h5 {
    font-size: 1.6rem;
    margin-bottom: 1rem;
    font-weight: bold;
    color: #777;
  }

  h6 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    font-weight: bold;
    color: #888;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1rem;
    color: #333;
    font-style: italic;
  }

  ul {
    list-style-type: disc;
    margin-left: 2rem;
    margin-bottom: 1rem;
  }

  ol {
    list-style-type: decimal;
    margin-left: 2rem;
    margin-bottom: 1rem;
  }

  li {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 0.5rem;
  }

  blockquote {
    font-style: italic;
    background-color: #f4f4f4;
    border-left: 4px solid #ccc;
    padding: 1rem;
    margin: 1.5rem 0;
    color: #555;
  }

  a {
    color: #007acc; /* Set link color */
    text-decoration: none; /* Remove underlines by default */
    font-weight: bold; /* Make link bold */
    border-bottom: 2px solid transparent; /* Underline effect on hover */
    transition: all 0.3s ease; /* Smooth transition for hover effect */
    
    &:hover {
      color: #005f99; /* Darker blue on hover */
      border-bottom: 2px solid #005f99; /* Add underline on hover */
    }

    &:active {
      color: #003f66; /* Even darker color when clicked */
      border-bottom: 2px solid #003f66; /* Underline effect stays active */
    }
  }

  pre {
    color: #ccc;
    background: #2d2d2d;
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    font-size: 1em;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    padding: 1em;
    margin: 35px 0;
    overflow: auto;
  }

  code {
    color: #ccc;
    background: none;
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    font-size: 1em;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
  }

  hr {
    border: 1px solid #ccc;
    margin: 2rem 0;
  }

  img {
    max-width: 100%;
    height: auto;
    margin-bottom: 1rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
  }

  th, td {
    padding: 8px;
    border: 1px solid #ccc;
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }
`;


export default function RenderMarkdown({ body }: { body: string }) {
    return (
        <KRMD rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>{body}</KRMD>

    );
}