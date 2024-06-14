import { useEffect } from 'react';
import './CursorEffect.scss';
import ufoImage from '../../Assets/catufo.png';

const CursorEffect = () => {
  useEffect(() => {
    const ufo = document.createElement('img');
    ufo.src = ufoImage;
    ufo.className = 'ufo';
    document.body.appendChild(ufo);

    let mouseX = 0,
      mouseY = 0;
    let ufoX = 0,
      ufoY = 0;
    const speed = 0.01;

    const maxDistance = 150;

    const handleMouseMove = (e) => {
      mouseX = e.pageX;
      mouseY = e.pageY;
    };

    const animate = () => {
      const distanceX = mouseX - ufoX;
      const distanceY = mouseY - ufoY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance > maxDistance) {
        ufoX += distanceX * speed;
        ufoY += distanceY * speed;
        ufo.style.left = `${ufoX}px`;
        ufo.style.top = `${ufoY}px`;
      }

      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      ufo.remove();
    };
  }, []);

  return null;
};

export default CursorEffect;
