#import "RNSearchBarManager.h"

#import "RNSearchBar.h"

#import "RCTBridge.h"

@implementation RNSearchBarManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  RNSearchBar *searchBar = [[RNSearchBar alloc] initWithEventDispatcher:self.bridge.eventDispatcher];

  return searchBar;
}

RCT_EXPORT_VIEW_PROPERTY(placeholder, NSString)
RCT_EXPORT_VIEW_PROPERTY(text, NSString)
RCT_EXPORT_VIEW_PROPERTY(showsCancelButton, BOOL)
RCT_EXPORT_VIEW_PROPERTY(barTintColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(tintColor, UIColor)
RCT_CUSTOM_VIEW_PROPERTY(hideBackground, BOOL, RNSearchBar)
{
    if ([RCTConvert BOOL:json]) {
        view.backgroundImage = [[UIImage alloc] init];
        view.backgroundColor = [UIColor clearColor];
    }
}

RCT_CUSTOM_VIEW_PROPERTY(textFieldBackgroundColor, UIColor, RNSearchBar)
{
  if ([RCTConvert UIColor:json]) {
    // logic borrowed from http://stackoverflow.com/a/22266150/395989
    CGSize size = CGSizeMake(34, 34);
    // create context with transparent background
    UIGraphicsBeginImageContextWithOptions(size, NO, 1);

    // Add a clip before drawing anything, in the shape of an rounded rect
    [[UIBezierPath bezierPathWithRoundedRect:CGRectMake(0,0, 34, 34)
                                cornerRadius:5.0] addClip];
    [[RCTConvert UIColor:json]  setFill];

    UIRectFill(CGRectMake(0, 0, size.width, size.height));
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();

    [view setSearchFieldBackgroundImage:image forState:UIControlStateNormal];
  }
}

- (NSDictionary *)constantsToExport
{
  return @{
           @"ComponentHeight": @([self view].intrinsicContentSize.height),
           };
}

@end
