<?php
/**
 * Created by PhpStorm.
 * User: davidjin
 * Date: 2015/12/16
 * Time: 23:03
 */

include 'resizeImage.php';

$type = $_GET['type'];
switch ($type) {
    case 1:
        read();
        break;
    case 2:
        delete();
        break;
    case 3:
        createDirectory();
        break;
    case 4:
        upload();
        break;
    default:
        break;
}

function read()
{
    $images = array();
    $path = $_POST['path'];

    $root = $_SERVER['DOCUMENT_ROOT'] . "/ImageBrowser/Image/";
    $dir = opendir($root . $path);

    //列出 images 目录中的文件
    while (($file = readdir($dir)) !== false) {
        if (is_dir($root . $path . $file)) {
            if ($file !== '.') {
                $images[] = array("name" => $file, "type" => "d", "size" => filesize($root . $path . $file));
            }
        } else {
            $images[] = array("name" => $file, "type" => "f", "size" => filesize($root . $path . $file));
        }
    }
    closedir($dir);

    header("Content-type: application/json; charset=utf-8");
    echo json_encode($images);
}

function delete()
{
    $file = $_POST['path'] . $_POST['name'];
    $root = $_SERVER['DOCUMENT_ROOT'] . "/ImageBrowser/Image/";

    echo $root . $file . "\n";
    var_dump(is_dir($root . $file));
    if (is_dir($root . $file)) {
        echo(rmdir($root . $file) ? 'true' : 'false');
    } else {
        echo(unlink($root . $file) ? 'true' : 'false');
    }
}

function createDirectory()
{
    $paras = $_POST;
    $dir = $_SERVER['DOCUMENT_ROOT'] . "/ImageBrowser/Image/" . $paras['path'] . $paras['name'];
    if (!file_exists($dir)) {
        mkdir($dir);

        //此处需要加上数据库记录目录信息，以方便下次获取时在也没中展示
    }

    //缩略图目录
    $dir2 = $_SERVER['DOCUMENT_ROOT'] . "/ImageBrowser/Thumbnail/" . $paras['path'] . $paras['name'];
    if (!file_exists($dir2)) {
        mkdir($dir2);
    }

}

function upload()
{
    $paras = $_POST;
    $dir = $_SERVER['DOCUMENT_ROOT'] . "/ImageBrowser/Image/" . $paras['path'];
    if (!file_exists($dir)) {
        mkdir($dir);
        //此处需要加上数据库记录目录信息，以方便下次获取时在也没中展示
    }
    //缩略图目录
    $dir2 = $_SERVER['DOCUMENT_ROOT'] . "/ImageBrowser/Thumbnail/" . $paras['path'];
    if (!file_exists($dir2)) {
        mkdir($dir2);
    }

    //保存文件
    $file = $dir . $_FILES['file']['name'];

    if (move_uploaded_file($_FILES['file']['tmp_name'], $file)) {
        //此处需要加上数据库记录目录信息，以方便下次获取时在也没中展示
        echo json_encode(array(
            'size' => $_FILES['file']['size'],
            'name' => $_FILES['file']['name'],
            'type' => 'f'
        ));
    }

    //保存缩略图

    $src_img = $file;
    $dst_img = $dir2;

    $resizeimage = new resizeImage($file, "100", "100", "0", $dir2 . $_FILES['file']['name']);

    //$thumbnails = new thumbnails($src_img, $width = 80, $height = 80, $dst_img);
    //$thumbnails->produce();
}

/**
 * 上传图片生成缩略图
 *
 * 需要GD2库的支持
 *
 * 初始化时需要参数new thumbnails('需要缩略的图片的原始地址','缩略图的宽度','缩略图的高度','（可选参数）缩略图的保存路径');
 * 如果最后一个参数不指定，那么缩略图就默认保存在原始图片的所在目录里的small文件夹里，
 * 如果不存在small文件夹，则会自动创建small文件夹
 *
 * 初始化之后需要调用方法produce创建缩略图
 * $thumbnails = new thumbnails(''....);
 * $thumbnails->produce();
 *
 * 其中可以获取原始图片的相关信息，宽度、高度、和图片mime
 *
 * $thumbnails->getImageWidth(); //int 图片宽度
 * $thumbnails->getImageHeight(); // int 图片高度
 * $thumbnails->getImageMime(); // string 图片的mime
 *
 * $thumbnails->trueSize(); //array 这是一个包含图片等比例缩略之后的宽度和高度值的数组
 * $size = array('width'=>'','height'=>'');
 * 获取图片等比缩略之后的宽度和高度
 * $size['width']//等比缩略图的宽度
 * $size['height']//等比缩略图的高度
 *
 */
class thumbnails
{

    private $imgSrc; //图片的路径
    private $saveSrc; //图片的保存路径，默认为空
    private $canvasWidth; //画布的宽度
    private $canvasHeight; //画布的高度
    private $im; //画布资源
    private $dm; //复制图片返回的资源

    /**
     * 初始化类，加载相关设置
     *
     * @param $imgSrc 需要缩略的图片的路径
     * @param $canvasWidth 缩略图的宽度
     * @param $canvasHeight 缩略图的高度
     */
    public function __construct($imgSrc, $canvasWidth, $canvasHeight, $saveSrc = null)
    {
        $this->imgSrc = $imgSrc;
        $this->canvasWidth = $canvasWidth;
        $this->canvasHeight = $canvasHeight;
        $this->saveSrc = $saveSrc;
    }

    /**
     * 生成缩略图
     */
    public function produce()
    {
        $this->createCanvas();
        $this->judgeImage();
        $this->copyImage();
        $this->headerImage();
    }

    /**
     * 获取载入图片的信息
     *
     * 包含长度、宽度、图片类型
     *
     * @return array 包含图片长度、宽度、mime的数组
     */
    private function getImageInfo()
    {
        return getimagesize($this->imgSrc);
    }

    /**
     * 获取图片的长度
     *
     * @return int 图片的宽度
     */
    public function getImageWidth()
    {
        $imageInfo = $this->getImageInfo();
        return $imageInfo['0'];
    }

    /**
     * 获取图片高度
     *
     * @return int 图片的高度
     */
    public function getImageHeight()
    {
        $imageInfo = $this->getImageInfo();
        return $imageInfo['1'];
    }

    /**
     * 获取图片的类型
     *
     * @return 图片的mime值
     */
    public function getImageMime()
    {
        $imageInfo = $this->getImageInfo();
        return $imageInfo['mime'];
    }

    /**
     * 创建画布
     *
     * 同时将创建的画布资源放入属性$this->im中
     */
    private function createCanvas()
    {
        $size = $this->trueSize();
        $this->im = imagecreatetruecolor($size['width'], $size['height']);
    }

    /**
     * 判断图片的mime值，确定使用的函数
     *
     * 同时将创建的图片资源放入$this->dm中
     */
    private function judgeImage()
    {
        $mime = $this->getImageMime();
        switch ($mime) {
            case 'image/png':
                $dm = imagecreatefrompng($this->imgSrc);
                break;

            case 'image/gif':
                $dm = imagecreatefromgif($this->imgSrc);
                break;

            case 'image/jpg':
                $dm = imagecreatefromjpeg($this->imgSrc);
                break;

            case 'image/jpeg':
                $dm = imagecreatefromgjpeg($this->imgSrc);
                break;
        }
        $this->dm = $dm;
    }

    /**
     * 判断图片缩略后的宽度和高度
     *
     * 此宽度和高度也作为画布的尺寸
     *
     * @return array 图片经过等比例缩略之后的尺寸
     */
    public function trueSize()
    {
        $proportionW = $this->getImageWidth() / $this->canvasWidth;
        $proportionH = $this->getImageHeight() / $this->canvasHeight;

        if (($this->getImageWidth() < $this->canvasWidth) && ($this->getImageHeight() < $this->canvasHeight)) {
            $trueSize = array('width' => $this->getImageWidth(), 'height' => $this->getImageHeight());
        } elseif ($proportionW >= $proportionH) {
            $trueSize = array('width' => $this->canvasWidth, 'height' => $this->getImageHeight() / $proportionW);
        } else {
            $trueSize = array('width' => $this->getImageWidth() / $proportionH, 'height' => $this->canvasHeight);
        }
        return $trueSize;
    }

    /**
     * 将图片复制到新的画布上面
     *
     * 图片会被等比例的缩放，不会变形
     */
    private function copyImage()
    {
        $size = $this->trueSize();
        imagecopyresized($this->im, $this->dm, 0, 0, 0, 0, $size['width'], $size['height'], $this->getImageWidth(), $this->getImageheight());
    }

    /**
     * 将图片输出
     *
     * 图片的名称默认和原图片名称相同
     *
     * 路径为大图片当前目录下的small目录内
     *
     * 如果small目录不存在，则会自动创建
     */
    public function headerImage()
    {
        $position = strrpos($this->imgSrc, '/');
        $imageName = substr($this->imgSrc, ($position + 1));
        if ($this->saveSrc) {
            $imageFlode = $this->saveSrc . '/';
        } else {
            $imageFlode = substr($this->imgSrc, 0, $position) . '/small/';
        }
        if (!file_exists($imageFlode)) {
            mkdir($imageFlode);
        }
        $saveSrc = $imageFlode . $imageName;
        imagejpeg($this->im, $saveSrc);
    }
}
