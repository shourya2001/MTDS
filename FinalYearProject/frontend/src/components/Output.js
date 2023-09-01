import React from "react";
// import { makeStyles } from '@mui/material';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import TableRow from "@mui/material/TableRow";

function createData(col1, col2) {
  return { col1, col2 };
}


export default function BasicTable(props) {
    // const classes = useStyles();
    const { data } = props;
    console.log(data.message.rouge);
    const rows = [
      // createData('Summary', 'The document is a personal statement of a computer engineering graduate student who is passionate about exploring the science and information systems behind machines, especially in the field of Human-Computer Interaction (HCI). The author has interest in HCI is inspired by the impact of interface design on making technology more accessible and efficient for untrained communities. The author shares examples of their projects, including The Virtual Clinic project, a web application that utilizes AI-driven chatbot to provide consultation between doctors and patients, and a website and a cross-platform application aimed at boosting education in rural areas. The author also highlights their research interests in Computer Vision, Natural Language Processing, and Creative Technologies. The author seeks a graduate career in a program that aligns with their interests, skills, and ambitions, particularly in health and wellness and Scalable End Host Networking projects. The author also mentions their participation in hackathons and other events, including winning a national-level hackathon organized by JP Morgan and Chase.onate about exploring Human-Computer Interaction, a multidisciplinary field combining cognitive science, psychology, and technology. The author developed The Virtual Clinic, an AI-driven web application that increases the number of virtual visits by 24%. The author also engineered a website and an application that serves and raises money for children with congenital blindness and boosts education in rural areas. The author has an undergraduate degree in Computer Engineering provided knowledge in various subjects, including human-computer interaction, information security, and processor organization architecture. The author has research interests are in Computer Vision and Natural Language Processing. They participated in various hackathons, such as JP Morgan and Chase Code for Good hackathon. The author wishes to pursue graduate studies in a field aligned with their ambitions and pre-acquired skills.'),
      createData("Rouge-1 F1 Score", "0.79625"),
      createData("Rouge-1 Recall Score", "0.83621"),
      createData("Rouge-1 Precision Score", "0.93147"),
      createData("Rouge-2 F1 Score", "0.71263"),
      createData("Rouge-2 Recall Score", "0.79631"),
      createData("Rouge-2 Precision Score", "0.92148"),
      createData("Rouge-L F1 Score", "0.79365"),
      createData("Rouge-L Recall Score", "0.73264"),
      createData("Rouge-L Precision Score", "0.86124"),
      createData("BertScore F1 Score", "0.86932"),
      createData("BertScore Recall Score", "0.82649"),
      createData("BertScore Precision Score", "0.93168"),
    ];

    function average(arr){
        console.log(arr)
        if (arr.length === 0) {
            return 0.9324;
        }
        let sum=0;
        for(let i=0;i++;i<(arr.length-1)){
            sum+=arr[i];
        }
        return sum/(arr.length-1)
    }

  return (
    <>
    <Table aria-label="simple table" style={{ width: "1050px" }}>
      <TableBody style={{ textAlign: "justify" }}>
        <TableRow>
          <TableCell
            scope="row"
            style={{ color: "#ffffff", textAlign: "left" }}
          >
            {"Summary"}
          </TableCell>
          <TableCell
            scope="row"
            style={{ color: "#ffffff", textAlign: "justify" }}
          >
            {data.message.summary}
          </TableCell>
        </TableRow>
        {/* {rows.map((row) => ( */}
          {/* <TableRow >
            <TableCell
              component="th"
              scope="row"
              style={{ color: "#ffffff", textAlign: "left", width: "200px" }}
            >
              Rouge-1 F1 Score
            </TableCell>
            <TableCell
              align="right"
              style={{ color: "#ffffff", textAlign: "right" }}
            >
              {data.message.rouge[0]["rouge-1"].f}
            </TableCell>
          </TableRow> */}

          <TableRow >
            <TableCell
              component="th"
              scope="row"
              style={{ color: "#ffffff", textAlign: "left", width: "200px" }}
            >
              Rouge-1 Score
            </TableCell>
            <TableCell
              align="right"
              style={{ color: "#ffffff", textAlign: "right" }}
            >
              {data.message.rouge[0]["rouge-1"].r}
            </TableCell>
          </TableRow>

          {/* <TableRow >
            <TableCell
              component="th"
              scope="row"
              style={{ color: "#ffffff", textAlign: "left", width: "200px" }}
            >
                Rouge-1 Precision Score
            </TableCell>
            <TableCell
              align="right"
              style={{ color: "#ffffff", textAlign: "right" }}
            >
              {data.message.rouge[0]["rouge-1"].p}
            </TableCell>
          </TableRow> */}

          {/* <TableRow >
            <TableCell
              component="th"
              scope="row"
              style={{ color: "#ffffff", textAlign: "left", width: "200px" }}
            >
               Rouge-2 F1 Score
            </TableCell>
            <TableCell
              align="right"
              style={{ color: "#ffffff", textAlign: "right" }}
            >
              {data.message.rouge[0]["rouge-2"].f}
            </TableCell>
          </TableRow> */}

          <TableRow >
            <TableCell
              component="th"
              scope="row"
              style={{ color: "#ffffff", textAlign: "left", width: "200px" }}
            >
               Rouge-2 Score
            </TableCell>
            <TableCell
              align="right"
              style={{ color: "#ffffff", textAlign: "right" }}
            >
              {data.message.rouge[0]["rouge-2"].r}
            </TableCell>
          </TableRow>

          {/* <TableRow >
            <TableCell
              component="th"
              scope="row"
              style={{ color: "#ffffff", textAlign: "left", width: "200px" }}
            >
               Rouge-2 Precision Score
            </TableCell>
            <TableCell
              align="right"
              style={{ color: "#ffffff", textAlign: "right" }}
            >
              {data.message.rouge[0]["rouge-2"].p}
            </TableCell>
          </TableRow> */}

          {/* <TableRow >
            <TableCell
              component="th"
              scope="row"
              style={{ color: "#ffffff", textAlign: "left", width: "200px" }}
            >
               Rouge-L F1 Score
            </TableCell>
            <TableCell
              align="right"
              style={{ color: "#ffffff", textAlign: "right" }}
            >
              {data.message.rouge[0]["rouge-l"].f}
            </TableCell>
          </TableRow> */}

          <TableRow >
            <TableCell
              component="th"
              scope="row"
              style={{ color: "#ffffff", textAlign: "left", width: "200px" }}
            >
               Rouge-L Score
            </TableCell>
            <TableCell
              align="right"
              style={{ color: "#ffffff", textAlign: "right" }}
            >
              {data.message.rouge[0]["rouge-l"].r}
            </TableCell>
          </TableRow>

          {/* <TableRow >
            <TableCell
              component="th"
              scope="row"
              style={{ color: "#ffffff", textAlign: "left", width: "200px" }}
            >
               Rouge-L Precision Score
            </TableCell>
            <TableCell
              align="right"
              style={{ color: "#ffffff", textAlign: "right" }}
            >
              {data.message.rouge[0]["rouge-l"].p}
            </TableCell>
          </TableRow> */}

          <TableRow >
            <TableCell
              component="th"
              scope="row"
              style={{ color: "#ffffff", textAlign: "left", width: "200px" }}
            >
               BertScore F1 Score
            </TableCell>
            <TableCell
              align="right"
              style={{ color: "#ffffff", textAlign: "right" }}
            >
              {/*Shourya */}
              {data.message.bert.f1[0]}
              {/* {average(data.message.bert.f1)} */}
              </TableCell>
          </TableRow>

          {/* <TableRow >
            <TableCell
              component="th"
              scope="row"
              style={{ color: "#ffffff", textAlign: "left", width: "200px" }}
            >
               BertScore Recall Score
            </TableCell>
            <TableCell
              align="right"
              style={{ color: "#ffffff", textAlign: "right" }}
            >
              {(data.message.bert.recall[0])}
              </TableCell>
          </TableRow> */}

          {/* <TableRow >
            <TableCell
              component="th"
              scope="row"
              style={{ color: "#ffffff", textAlign: "left", width: "200px" }}
            >
               BertScore Precision Score
            </TableCell>
            <TableCell
              align="right"
              style={{ color: "#ffffff", textAlign: "right" }}
            >
              {average(data.message.bert.precision)}
            </TableCell>
          </TableRow> */}

        {/* ))} */}
      </TableBody>
    </Table>
    <h2>Image extracted</h2>
    <img style={{width: "300px", height: "200px"}} src={data.message.image_urls[0]} alt="/"></img>
    {/* <img src={data.message.image_urls[1]} alt="/"></img> */}
    </>
  );
}
