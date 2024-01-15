import Link from 'next/link';

const Navbar = () => {
    return (
        <div className='w-full h-16 bg-stone-500 fixed top-0'>
            <div className='container mx-auto px-4 h-full'>
                <div className='flex justify-between items-center h-full'>
                    <ul className='hidden md:flex gap-x-6 text-white'>
                        <li>
                            <Link href='/test'>
                                <p>Test</p>
                            </Link>
                        </li>
                        <li>
                            <Link href='/other'>
                                <p>Other</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
