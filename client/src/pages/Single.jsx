import { Link } from "react-router-dom";

import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import Menu from "../components/Menu";

const Single = () => {
  return (
    <div className="single">
      <div className="content">
        <img
          src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
        />
        <div className="user">
          <img
            src="https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
          <div className="info">
            <span>John</span>
            <p>Posted 2 days ago</p>
          </div>
          <div className="edit">
            <Link to={`/write?edit=2`}>
              <img src={Edit} alt="editicon" />
            </Link>
            <img src={Delete} alt="deleteicon" />
          </div>
        </div>
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus,
          quos?
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          quis necessitatibus repudiandae iure expedita dolorem autem repellat
          officiis aspernatur dolorum similique, aliquid earum numquam voluptas,
          blanditiis iste voluptatem fugit minus nisi dolore illo perferendis
          hic consequuntur libero. Vitae reiciendis incidunt illum ea! Aliquid
          modi provident ratione. Unde maxime quisquam iusto consectetur,
          praesentium facere eligendi? Pariatur sit cumque tempore consectetur
          voluptates laborum, reprehenderit eveniet omnis iste, a quam in
          dignissimos aperiam, libero dolorum error. Quibusdam, aut dolore
          molestias doloremque mollitia vel magni. Est tempora corrupti adipisci
          dolores voluptate nemo molestiae, maiores eos sed quod porro amet
          recusandae laborum deserunt iusto iure!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
          magni nam alias, dolorem numquam molestiae a quas impedit
          perspiciatis, voluptas obcaecati tenetur. At totam itaque nobis odit
          beatae eaque distinctio quasi porro dolores aliquam explicabo eligendi
          quibusdam, delectus modi iste perspiciatis ut molestiae accusamus
          ullam rerum deleniti quisquam debitis. Iure dolore est ullam,
          perferendis et aliquid! Omnis magni ad quidem itaque? Quod accusantium
          ipsa nostrum fuga, doloribus laboriosam beatae eum, perferendis
          dignissimos nulla, delectus architecto asperiores laudantium
          reiciendis sapiente a nihil consequatur veritatis ipsam enim. Expedita
          labore molestias, architecto laborum aut veritatis veniam. Iure
          obcaecati impedit exercitationem vitae corporis esse.
        </p>
      </div>
      <Menu />
    </div>
  );
};

export default Single;
