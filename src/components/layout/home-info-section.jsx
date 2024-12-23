import { Link, Stack, Typography } from "@mui/joy";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";
import tg from "../../assets/tg.png";

export const HomeInfoSection = () => {
  const socialMediaLinks = [
    {
      href: "https://github.com/thetiagogil",
      icon: <FaGithub className="icon" size={25} />
    },
    {
      href: "https://www.linkedin.com/in/thetiagogil/",
      icon: <FaLinkedin className="icon" size={25} />
    },
    {
      href: "https://www.facebook.com/thetiagogil/",
      icon: <FaFacebook className="icon" size={25} />
    },
    {
      href: "https://www.instagram.com/thetiagogil/",
      icon: <FaInstagram className="icon" size={25} />
    }
  ];

  return (
    <Stack sx={{ maxWidth: { xs: "100%", lg: "600px" }, gap: 4 }}>
      <Stack component="section" sx={{ textAlign: { xs: "center", lg: "left" } }}>
        <Typography level="h1">TIAGO GIL</Typography>
        <Typography level="h3" sx={{ fontSize: { xs: "20px", lg: "24px" } }}>
          Web Developer & Master Architect
        </Typography>
      </Stack>

      <Stack component="section">
        <img className="img" src={tg} alt="Tiago Gil" />
      </Stack>

      <Stack component="section">
        <Typography level="body-md" sx={{ textAlign: "justify" }}>
          As a Junior Full-stack Web Developer with a Master's Degree in Architecture, I bring strong problem-solving
          skills and attention to detail to building user-friendly web applications. My background in architecture
          allows me to blend creative design with technical expertise, enabling the development of innovative solutions
          that combine design, technology, and data.
        </Typography>
      </Stack>

      <Stack component="section" sx={{ alignItems: { xs: "center", lg: "baseline", gap: 8 } }}>
        <Link component={RouterLink} to="/timeline" underline="none">
          <Typography
            level="body-md"
            endDecorator={<FaArrowRightLong size={12} />}
            sx={{
              transition: "0.3s",
              "&:hover": { color: "primary.white" }
            }}
          >
            Check out my timeline
          </Typography>
        </Link>
        <Link href="/CV_TiagoGil.pdf" download="CV_TiagoGil.pdf" underline="none">
          <Typography
            level="body-md"
            endDecorator={<MdOutlineFileDownload size={16} />}
            sx={{
              transition: "0.3s",
              "&:hover": { color: "primary.white" }
            }}
          >
            Download my resume
          </Typography>
        </Link>
      </Stack>

      <Stack
        component="section"
        sx={{
          flexDirection: "row",
          gap: 2,
          justifyContent: { xs: "center", lg: "left" }
        }}
      >
        {socialMediaLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            target="_blank"
            sx={{
              color: "primary.white3",
              transition: "color 0.3s",
              "&:hover": {
                color: "primary.white"
              }
            }}
          >
            {link.icon}
          </Link>
        ))}
      </Stack>
    </Stack>
  );
};
