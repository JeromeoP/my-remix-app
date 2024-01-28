interface Experience {
    startDate: string;
    endDate: string;
    company: string;
    description: string;
  }
  
  interface Education {
    fromYear: string;
    toYear: string;
    title: string;
    university: string;
    city: string;
  }
  
  export const createHTMLForPDF = (data: {
    firstName: string;
    lastName: string;
    address: string;
    zipCode: string;
    city: string;
    email: string;
    phone: string;
    experiences: Experience[];
    educations: Education[];
    openAIResponse: string;
  }): string => {
    // Generate the experiences HTML
    const experienceHTML = data.experiences.map(exp => `
      <div class="section__list-item">
        <div class="left">
          <div class="name">${exp.company}</div>
          <div class="duration">${exp.startDate} - ${exp.endDate}</div>
        </div>
        <div class="right">
          <div class="desc">${exp.description}</div>
        </div>
      </div>
    `).join('');

      // Generate the education HTML
  const educationHTML = data.educations.map(edu => `
  <div class="section__list-item">
    <div class="left">
      <div class="name">${edu.university}</div>
      <div class="addr">${edu.city}</div>
      <div class="duration">${edu.fromYear} - ${edu.toYear}</div>
    </div>
    <div class="right">
      <div class="name">${edu.title}</div>
    </div>
  </div>
`).join('');
  
    // Include the CSS styles directly within the <style> tag
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>CV of ${data.firstName} ${data.lastName}</title>
        <style>
        * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      html {
        height: 100%;  
      }
      
      body {
        min-height: 100%;  
        background: #eee;
        font-family: 'Lato', sans-serif;
        font-weight: 400;
        color: #222;
        font-size: 14px;
        line-height: 26px;
        padding-bottom: 50px;
      }
      
      .container {
        max-width: 700px;   
        background: #fff;
        margin: 0px auto 0px; 
        box-shadow: 1px 1px 2px #DAD7D7;
        border-radius: 3px;  
        padding: 40px;
        margin-top: 50px;
      }
      
      .header {
        margin-bottom: 30px;
        
        .full-name {
          font-size: 40px;
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        
        .first-name {
          font-weight: 700;
        }
        
        .last-name {
          font-weight: 300;
        }
        
        .contact-info {
          margin-bottom: 20px;
        }
        
        .email ,
        .phone {
          color: #999;
          font-weight: 300;
        } 
        
        .separator {
          height: 10px;
          display: inline-block;
          border-left: 2px solid #999;
          margin: 0px 10px;
        }
        
        .position {
          font-weight: bold;
          display: inline-block;
          margin-right: 10px;
          text-decoration: underline;
        }
      }
      
      
      .details {
        line-height: 20px;
        
        .section {
          margin-bottom: 40px;  
        }
        
        .section:last-of-type {
          margin-bottom: 0px;  
        }
        
        .section__title {
          letter-spacing: 2px;
          color: #54AFE4;
          font-weight: bold;
          margin-bottom: 10px;
          text-transform: uppercase;
        }
        
        .section__list-item {
          margin-bottom: 40px;
        }
        
        .section__list-item:last-of-type {
          margin-bottom: 0;
        }
        
        .left ,
        .right {
          vertical-align: top;
          display: inline-block;
        }
        
        .left {
          width: 60%;    
        }
        
        .right {
          tex-align: right;
          width: 39%;    
        }
        
        .name {
          font-weight: bold;
        }
        
        a {
          text-decoration: none;
          color: #000;
          font-style: italic;
        }
        
        a:hover {
          text-decoration: underline;
          color: #000;
        }
        
        .skills {
          
        }
          
        .skills__item {
          margin-bottom: 10px;  
        }
        
        .skills__item .right {
          input {
            display: none;
          }
          
          label {
            display: inline-block;  
            width: 20px;
            height: 20px;
            background: #C3DEF3;
            border-radius: 20px;
            margin-right: 3px;
          }
          
          input:checked + label {
            background: #79A9CE;
          }
        }
      }
              </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="full-name">
              <span class="first-name">${data.firstName}</span>
              <span class="last-name">${data.lastName}</span>
            </div>
            <div class="contact-info">
              <span class="email">Email: </span>
              <span class="email-val">${data.email}</span>
              <span class="separator"></span>
              <span class="phone">Phone: </span>
              <span class="phone-val">${data.phone}</span>
            </div>
            <div class="about">
              <span class="desc">${data.openAIResponse}</span>
            </div>
          </div>
          <div class="details">
            <div class="section">
              <div class="section__title">Experience</div>
              <div class="section__list">
                ${experienceHTML}
              </div>
            </div>
            <div class="section">
            <div class="section__title">Education</div>
            <div class="section__list">
              ${educationHTML}
            </div>
          </div>
            <!-- Other sections like Education, Projects, Skills, etc. -->
          </div>
        </div>
      </body>
      </html>
    `;
  };
  