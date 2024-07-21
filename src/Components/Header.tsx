import { motion, useAnimation, useScroll, useMotionValueEvent } from "framer-motion";
import { useMatch } from "react-router";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Footer from "./Footer";

const Nav = styled(motion.nav)`
  display: flex;
  z-index: 10;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: black;
  font-size: 18px;
  padding: 20px 60px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Items = styled.ul`
  margin-left: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.lighter};
  text-shadow: 0px 0px 2px black;
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.darker};
  }
`;

const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
    cursor: pointer;
    &:hover{
      color: #dadada;
    }
  }
`;

const Input = styled(motion.input)`
  outline: none;
  transform-origin: right center;
  position: absolute;
  left: -195px;
  right: 0px;
  padding: 5px 10px;
  padding-left: 35px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
  border-radius: 5px;
  &::placeholder{
    color: #c6c6c6;
  }// "&" 이거쫌 잘쓰자 제발 제발 styled components 쓸때는 안되면 & 붙여볼 생각부터 하자 쫌.
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const navVariants = {
    top: {
      backgroundColor: "rgba(0, 0, 0, 0)",
    },
    scroll: {
      backgroundColor: "rgba(0, 0, 0, 1)",
    },
};

interface IForm {
    keyword: string;
}  

function Header() {
    const [searchOpen, setSearchOpen] = useState(false);
    const homeMatch = useMatch("/");
    const tvMatch = useMatch("/tv");
    const inputAnimation = useAnimation();
    const navAnimation = useAnimation();
    const { scrollY } = useScroll();

    const toggleSearch = () => {
      if (searchOpen) {
        inputAnimation.start({
          scaleX: 0,
        });
      } else {
        inputAnimation.start({ scaleX: 1 });
      }
      setSearchOpen((prev) => !prev);
    };

    const toggleSearchFalse = () => {
      if (searchOpen) {
        inputAnimation.start({
          scaleX: 0,
        });
      }
      setSearchOpen(false);
    };

    useMotionValueEvent(scrollY, "change", () => {
        if (scrollY.get() > 70) {
            navAnimation.start("scroll");
          } else {
            navAnimation.start("top");
        }
    })

    const history = useNavigate();
    const { register, handleSubmit } = useForm<IForm>();
    const onValid = (data: IForm) => {
    history(`/search?keyword=${data.keyword}`);
    };

    return (
    <>
    <Nav variants={navVariants} animate={navAnimation} initial="top">
        <Col>
        <Link to="/">
          <img onClick={toggleSearchFalse} src="/minflix-logo.png" style={{width: 120, height: 35}}/>
        </Link>
        <Items>
            <Item>
            <Link style={{fontWeight: 500}} onClick={toggleSearchFalse} to="/">Home {homeMatch && <Circle layoutId="circle" />}</Link>
            </Item>
            <Item>
            <Link style={{fontWeight: 500}} onClick={toggleSearchFalse} to="/tv">Tv Shows {tvMatch && <Circle layoutId="circle" />}</Link>
            </Item>
        </Items>
        </Col>
        <Col>
        <Search onSubmit={handleSubmit(onValid)}>
            <motion.svg
                onClick={toggleSearch}
                animate={{ x: searchOpen ? -190 : 0 }}
                transition={{ type: "linear" }}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                ></path>
            </motion.svg>
            <Input
                {...register("keyword", { required: true, minLength: 2 })}
                transition={{ type: "linear" }}
                animate={inputAnimation}
                initial={{ scaleX: 0 }}
                placeholder="Search keywords" />
        </Search>
        </Col>
    </Nav>
    <Outlet />
    <Footer/>
    </>
    );
}

export default Header;