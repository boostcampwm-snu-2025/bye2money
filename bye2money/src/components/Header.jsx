import React, {useState} from 'react';
import { Link } from 'react-router-dom';


import logoImage from '../assets/Logo.svg';
import listImg from '../assets/list.svg';
import calendarImg from '../assets/calendar.svg';
import statsImg from '../assets/stats.svg';
import rightImg from '../assets/chevron-right.svg';
import leftImg from '../assets/chevron-left.svg';



const Header = ({ activeMenu, setActiveMenu }) => {
    
    // 3. 동적으로 클래스를 조합하는 함수
    const getLinkClasses = (menuName) => {
        // 기본 클래스: h-full p-[8px]
        let baseClasses = 'p-[8px]';
        // 활성화(클릭) 상태일 때 추가할 클래스
        if (activeMenu === menuName) {
            // 활성화된 버튼에만 배경색 클래스 추가
            return `${baseClasses} bg-white rounded-[22px]`; 
        } 
        else {
            return baseClasses
        }
    };

    const [month, setMonth] = useState(8);
    const [year, setYear] = useState(2023);

    const monthName = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September","October", "November", "December"]


    const nextmm = () => {
        if (month == 12) {
            setMonth(1);
            setYear(year+1);
        }
        else {
            setMonth(month+1);
        }
    }

    const prevmm = () => {
        if (month == 1) {
            setMonth(12);
            setYear(year-1);
        }
        else {
            setMonth(month-1);
        }
    }


  return (
    <header className="sticky w-full h-[216px] top-0 bg-[#73A4D0] shadow-md flex justify-around items-center z-10">
        <div className="w-[846px] flex justify-between" > 

            <Link to="/" className='w-[132px] gap-4px mt-auto mb-auto'> 
                <img
                    onClick={()=> setActiveMenu(null)}
                    src={logoImage}
                    alt="로고 (클릭 시 홈으로 이동)"
                />
            </Link>  

            <div className='flex gap-[24px]'>
                <img onClick={()=> prevmm()} src={leftImg} alt="left" />
                <div className='text-center w-[120px]'>
                    <p className='text-[14px]'> {year} </p>
                    <h2 className='text-[48px]'> {month} </h2>
                    <p className='text-[14px]'>{monthName[month-1]}</p>
                </div>
                <img onClick={()=> nextmm()} src={rightImg} alt="right"/>
            </div>

            <div className='w-[132px] gap-[4px] flex justify-between mt-auto mb-auto'>
                <Link to="/transaction"
                    onClick={() => setActiveMenu('list')} // 👈 setActiveMenu 사용
                    className={getLinkClasses('list')} 
                >
                    <img src={listImg} alt="거래 목록" />
                </Link>

                <Link to="/calendar" 
                    onClick={()=> setActiveMenu('calendar')}
                    className={getLinkClasses('calendar')} 
                >
                    <img src={calendarImg} alt="calendar" />
                </Link>

                <Link to='/stats'
                    onClick={()=> setActiveMenu('stat')}
                    className={getLinkClasses('stat')}
                >
                    <img src={statsImg} alt="stat" />
                </Link>
            </div>
        </div>
    </header>
  );
};

export default Header;