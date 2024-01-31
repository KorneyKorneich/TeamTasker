import styles from "./Sidebar.module.scss"
import {useSelector} from "react-redux";
import {useAppDispatch} from "src/hooks/storeHooks.ts";
import {getProjectById} from "src/entities/Project/lib/services/getProjectById.ts";
import {getId, getIsAuth} from "src/entities/User";
import {memo, useEffect} from "react";
import {getProjects} from "src/entities/Project/lib/selectors/getProjects.ts";
import {Link} from "react-router-dom";
import {SVG} from "src/shared";
import ProjectIcon from "../assets/project-icon.svg?react"


export const Sidebar =  memo(() => {
    const dispatch = useAppDispatch()
    const userId = useSelector(getId);
    const isAuth = useSelector(getIsAuth);
    const projects = useSelector(getProjects);

    console.log(userId)



    // const [projects, setProjects] = useState<ProjectSchema[]>([]);

    useEffect(() => {
       dispatch(getProjectById(userId));
    }, [isAuth]);
//TODO: поработать над цветом иконки в разных состояниях ссылки
    return (
        <div className={styles.wrapper}>
            <h3>Your projects</h3>
            { projects && projects.map((el) => {
                return(
                    <div className={styles.projectLink}>
                        <Link className={styles.project} key={el._id} to={`workspace/${el._id}`}>
                            <div className={styles.projectIcon}>
                                <SVG size={20} color={"#ECEDF1"}>
                                    <ProjectIcon />
                                </SVG>
                            </div>
                            {el.title}
                        </Link>
                    </div>
                )
            })}
        </div>
    );
});




