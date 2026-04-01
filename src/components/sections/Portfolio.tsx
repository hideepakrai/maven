import { Building2, LayoutGrid } from "lucide-react";
import React, { useState } from "react";
import { LuHouse } from "react-icons/lu";

const Portfolio = ({
  marginleft = "auto",
  marginright = "auto",
  margintop = 0,
  marginbotton = 0,
  width = 85,
  backgroundColor = "#fff",
  backgroundImage = "./assets/Image/about-image.jpg",
  AboutImage = "./assets/Image/about-image.jpg",
  fontsize = "50",
  fontsizeContent = "18",
  AboutTitleSize = "42",
  AboutTitleContent = "18",


    // ⭐ NEW SERVICES PROPS
  ServicesTitle = "OUR SERVICES",
  ServicesTitleSize = "42",
  ServicesTitleColor = "#000",
  ServicesContentSize = "18",
  ServicesBg = "#f7f7f7",
  SerTitleSize = "20",
AboutSubTitleSize="20",

// Project props

  ProjectTitle = "OUR PROJECTS",
  ProjectTitleSize = "48px",
  ProjectTitleColor = "#000",
  ProjectBackground = "#fff",
  ProjectFilterColor = "#000",
  ProjectFilterActiveColor = "#d1b28f",
  ProjectCardTitleSize = "22px",
  ProjectCardCategorySize = "14px",
  ProjectCardTitleColor = "#fff",
  ProjectCardCategoryColor = "#d1b28f",


  BlogTitleSize="24",
  BlogTitleColor="#000"


}) => {

 const [active, setActive] = useState("All Projects");
    const projects = [
    {
      category: "Commercial",
      title: "Terra Office",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      category: "Interior",
      title: "Vishakha Office Interior",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      category: "Residential",
      title: "Urban Forest For Alembic Group, Bangalore",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      category: "Interior",
      title: "Scandinavian Interior of Apartment, Mumbai",
      image: "https://images.unsplash.com/photo-1708413604990-a1d7fceea954?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      category: "Religious",
      title: "The Emerald Gulistan Mosque At Kanpur",
      image: "https://images.unsplash.com/photo-1708413604990-a1d7fceea954?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      category: "Religious",
      title: "Chapel Of Unity, Rwanda",
      image: "https://images.unsplash.com/photo-1708413604990-a1d7fceea954?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];


     const filtered =
    active === "All Projects"
      ? projects
      : projects.filter((p) => p.category === active);


        const filters = [
    "All Projects",
    "Commercial",
    "Hospitality",
    "Institutional",
    "Interior",
    "Religious",
    "Residential",
    "Townships",
  ];

  
  return (
    <>
      <div
        style={{
          height: "80vh",
          backgroundImage: `url(${backgroundImage})`,
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          // backgroundColor: backgroundColor,
          // opacity: 0.6,
        }}>
        <div
          style={{
            width: `${width}%`,
            margin: `${margintop}px ${marginright} ${marginbotton}px ${marginleft}`,
          }}>
          <h2
            style={{
              fontSize: `${fontsize}px`,
              textAlign: "center",
            }}>
            Title
          </h2>
          <p
            style={{
              fontSize: `${fontsizeContent}px`,
              textAlign: "center",
            }}>
            Content
          </p>
        </div>
      </div>

      <div
        style={{
          backgroundColor: backgroundColor,
        }}>
        <div
          style={{
            width: `${width}%`,
            margin: `${margintop}px ${marginright} ${marginbotton}px ${marginleft}`,
          }}
          >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              alignItems: "center",
              paddingTop: "40px",
              paddingBottom: "40px",
            }}>
            <div>
                   <h4
                style={{
                  fontSize: `${AboutSubTitleSize}px`,
                  fontWeight: "500",
                  color:"#e0b36c",
                }}>
              About Us
              </h4>

              <h2
                style={{
                  fontSize: `${AboutTitleSize}px`,
                  fontWeight: "700",
                }}>
                Portfolio Section
              </h2>
              <p
                style={{
                  fontSize: `${AboutTitleContent}px`,
                  fontWeight: "500",
                }}>
               Lorem Ipsum is simply dummy text of the printing and <br></br> typesetting industry.
                Lorem Ipsum has been the industry's <br></br> standard dummy text ever  since the 1500s, 
                when <br></br> an unknown printer took a galley of type and scrambled it to make 
                a type specimen book.


              </p>
            </div>

            <div>
              <img
                src={AboutImage}
                alt="About Image"
                style={{
                  borderRadius: "6px",
                }}></img>
            </div>
          </div>
        </div>
      </div>


{/* ⭐ OUR SERVICES SECTION ⭐ */}
      <div
        style={{
          backgroundColor: ServicesBg,
          paddingTop: "60px",
          paddingBottom: "60px",
        }}
      >
        <div
          style={{
            width: `${width}%`,
            margin: `${margintop}px ${marginright} ${marginbotton}px ${marginleft}`,
          }}
        >
          {/* ⭐ TITLE comes from props */}
          <h2
            style={{
              textAlign: "center",
              fontSize: `${ServicesTitleSize}px`,
              color: ServicesTitleColor,
              fontWeight: "700",
              marginBottom: "40px",
            }}
          >
        OUR SERVICES
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "30px",
            }}
          >
            {/* CARD 1 */}
            <div
              style={{
                backgroundColor: "#fff",
                padding: "30px",
                borderRadius: "10px",
                boxShadow: "0px 0px 15px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  fontSize: `${ServicesTitleSize}px`,
                  marginBottom: "20px",
                  color: "#e0b36c",
                }}
              >
                <Building2 
                style={{
                width:"35px",
                height:"35px"
                }}
                />
              </div>
              <h3 style={{ fontSize: `${SerTitleSize}px`, fontWeight: "700", paddingBottom: "10px", }}>
                URBAN DESIGN
              </h3>
              <p
                style={{
                  fontSize: `${ServicesContentSize}px`,
                  lineHeight: "28px",
                }}
              >
               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
              </p>
            </div>

            {/* CARD 2 */}
            <div
              style={{
                backgroundColor: "#fff",
                padding: "30px",
                borderRadius: "10px",
                boxShadow: "0px 0px 15px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  fontSize: `${ServicesTitleSize}px`,
                  marginBottom: "20px",
                  color: "#e0b36c",
                }}
              >
              <LayoutGrid 
              style={{
                width:"34px",
                height:"34px"
                }}
              />
              </div>
              <h3 style={{ fontSize: `${SerTitleSize}px`, fontWeight: "700", paddingBottom: "10px", }}>
                ARCHITECTURE
              </h3>
              <p
                style={{
                  fontSize: `${ServicesContentSize}px`,
                  lineHeight: "28px",
                }}
              >
               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
              </p>
            </div>

            {/* CARD 3 */}
            <div
              style={{
                backgroundColor: "#fff",
                padding: "30px",
                borderRadius: "10px",
                boxShadow: "0px 0px 15px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  fontSize: `${ServicesTitleSize}px`,
                  marginBottom: "20px",
                  color: "#e0b36c",
                }}
              >
             <LuHouse 
             style={{
                fontSize:"35px"
             }}
             />

              </div>
              <h3 style={{ fontSize: `${SerTitleSize}px`, fontWeight: "700", paddingBottom: "10px", }}>
                INTERIOR
              </h3>
              <p
                style={{
                  fontSize: `${ServicesContentSize}px`,
                  lineHeight: "28px",
                 
                }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
              </p>
            </div>
          </div>
        </div>
      </div>

     
    <section
  style={{
    background: ProjectBackground,
    width: "100%",
    padding: "80px 20px",
  }}
>

    <div 
     style={{
            width: `${width}%`,
            margin: `${margintop}px ${marginright} ${marginbotton}px ${marginleft}`,
          }}
    >
  {/* Title */}
  <h2
    style={{
      fontSize: ProjectTitleSize,
      color: ProjectTitleColor,
      letterSpacing: "5px",
      textTransform: "uppercase",
      fontWeight: "600",
      marginBottom: "40px",
    }}
  >
    {ProjectTitle}
  </h2>

  {/* Filters */}
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "24px",
      marginBottom: "40px",
    }}
  >
    {filters.map((filter) => (
      <button
        key={filter}
        onClick={() => setActive(filter)}
        style={{
          color:
            active === filter ? ProjectFilterActiveColor : ProjectFilterColor,
          border: "none",
          background: "transparent",
          borderBottom:
            active === filter
              ? `2px solid ${ProjectFilterActiveColor}`
              : "2px solid transparent",
          fontSize: "18px",
          paddingBottom: "6px",
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        {filter}
      </button>
    ))}
  </div>

  {/* Grid */}
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "40px",
    }}
  >
    {filtered.map((item, i) => (
      <div
        key={i}
        style={{
          position: "relative",
          cursor: "pointer",
          overflow: "hidden",
          borderRadius: "8px",
        }}
      >
        <img
          src={item.image}
          style={{
            width: "100%",
            height: "280px",
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: "0",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "20px",
            transition: "background 0.3s ease",
          }}
          className="project-overlay"
        >
          {/* Category */}
          <span
            style={{
              fontSize: ProjectCardCategorySize,
              color: ProjectCardCategoryColor,
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: "6px",
            }}
          >
            {item.category}
          </span>

          {/* Title */}
          <h3
            style={{
              fontSize: ProjectCardTitleSize,
              color: ProjectCardTitleColor,
              fontWeight: 600,
            }}
          >
            {item.title}
          </h3>
        </div>
      </div>
    ))}
  </div>
  </div>
</section>







    <div 
     style={{
          backgroundColor: ServicesBg,
          paddingTop: "60px",
          paddingBottom: "60px",
        }}
    >
        <div 
         style={{
            width: `${width}%`,
            margin: `${margintop}px ${marginright} ${marginbotton}px ${marginleft}`,
          }}
        >
            <h2 
              style={{
              textAlign: "center",
              fontSize: `${ServicesTitleSize}px`,
              color: ServicesTitleColor,
              fontWeight: "700",
              marginBottom: "40px",
            }}
            >Blog</h2>

            <div 
        style={{
      display: "grid",
gridTemplateColumns: "repeat(3, 1fr)",
      gap: "40px",
    }}
            >
                <div 
                style={{
                    backgroundColor:"#fff",
                    boxShadow:"0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)"
                }}
                >
                    <img src="https://images.unsplash.com/photo-1708413604990-a1d7fceea954?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Blog image"></img>
                    <div 
                    style={{
                        padding:"18px",
                        gap:"10px",
                        display:"grid"
                    }}
                    >
                    <h4
                    style={{
                          fontSize: `${BlogTitleSize}px`,
                           color: BlogTitleColor,
                           fontWeight: "700",
                    }} 
                    >
                        Design for 'The Vertex' Tower Unveiled in Mumbai
                    </h4>
                    <p>Our ambitious new 50-story mixed-use tower aims to redefine the city skyline with its innovative sustainable facade and public sky-gardens.</p>
                    <p>November 12, 2025</p>
                    </div>
                </div>

                 <div 
                style={{
                    backgroundColor:"#fff",
                    boxShadow:"0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)"
                }}
                >
                    <img src="https://images.unsplash.com/photo-1708413604990-a1d7fceea954?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Blog image"></img>
                    <div 
                    style={{
                        padding:"18px",
                        gap:"10px",
                        display:"grid"
                    }}
                    >
                    <h4
                    style={{
                          fontSize: `${BlogTitleSize}px`,
                           color: BlogTitleColor,
                           fontWeight: "700",
                    }} 
                    >
                        Design for 'The Vertex' Tower Unveiled in Mumbai
                    </h4>
                    <p>Our ambitious new 50-story mixed-use tower aims to redefine the city skyline with its innovative sustainable facade and public sky-gardens.</p>
                    <p>November 12, 2025</p>
                    </div>
                </div>


                 <div 
                style={{
                    backgroundColor:"#fff",
                    boxShadow:"0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)"
                }}
                >
                    <img src="https://images.unsplash.com/photo-1708413604990-a1d7fceea954?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Blog image"></img>
                    <div 
                    style={{
                        padding:"18px",
                        gap:"10px",
                        display:"grid"
                    }}
                    >
                    <h4
                    style={{
                          fontSize: `${BlogTitleSize}px`,
                           color: BlogTitleColor,
                           fontWeight: "700",
                    }} 
                    >
                        Design for 'The Vertex' Tower Unveiled in Mumbai
                    </h4>
                    <p>Our ambitious new 50-story mixed-use tower aims to redefine the city skyline with its innovative sustainable facade and public sky-gardens.</p>
                    <p>November 12, 2025</p>
                    </div>
                </div>


            </div>

            <div 
            style={{textAlign:"center", marginTop:"20px"}}
            >
          <button
          style={{
            backgroundColor:"#debb70",
            padding:"12px 30px",
            fontSize:"16px",
            fontWeight:"600",
            color:"#fff",
          }} 
          >See All Blog</button>         
            </div>
        </div>
    </div>

    </>
  );
};

export default Portfolio;
